const { spawn } = require('child_process');
const http = require('http');
const net = require('net');
const path = require('path');
const treeKill = require('tree-kill');

const ROOT = path.join(__dirname, '..');
const PORT = 8080;
const HOST = '127.0.0.1';
const READY_URL = `http://${HOST}:${PORT}/index.html`;
const cypressArgs = process.argv.slice(2);

const httpServerBin = path.join(ROOT, 'node_modules', 'http-server', 'bin', 'http-server');
const cypressBin = path.join(ROOT, 'node_modules', 'cypress', 'bin', 'cypress');

function assertPortFree(port, host) {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();

    probe.once('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        reject(
          new Error(
            `Porta ${port} já está em uso em ${host}. ` +
              'Encerre o processo que a ocupa e tente novamente. ' +
              'Os testes não serão executados contra um servidor desconhecido.'
          )
        );
        return;
      }
      reject(error);
    });

    probe.once('listening', () => {
      probe.close((closeError) => {
        if (closeError) {
          reject(closeError);
          return;
        }
        resolve();
      });
    });

    probe.listen(port, host);
  });
}

function waitForHttp200(url, options) {
  const { timeoutMs = 30000, isServerAlive } = options;
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      if (!isServerAlive()) {
        reject(new Error(`Servidor encerrou antes de responder 200 em ${url}`));
        return;
      }

      const req = http.get(url, (res) => {
        res.resume();

        if (res.statusCode === 200) {
          resolve();
          return;
        }

        if (res.statusCode === 404) {
          reject(
            new Error(
              `Esperado HTTP 200 em ${url}, mas o servidor respondeu 404. ` +
                'Confira se a raiz servida contém index.html.'
            )
          );
          return;
        }

        retry(`status ${res.statusCode}`);
      });

      req.on('error', (error) => retry(error.message));
      req.setTimeout(3000, () => req.destroy(new Error('Tempo limite da resposta HTTP')));
    };

    const retry = (reason) => {
      if (Date.now() - started > timeoutMs) {
        reject(
          new Error(
            `Timeout aguardando HTTP 200 em ${url}` +
              (reason ? ` (último motivo: ${reason})` : '')
          )
        );
        return;
      }
      setTimeout(attempt, 250);
    };

    attempt();
  });
}

function runCypress(args) {
  return new Promise((resolve, reject) => {
    // Sem shell: evita quebrar caminhos com espaços (ex.: "Área de Trabalho").
    const child = spawn(process.execPath, [cypressBin, 'run', '--browser', 'electron', ...args], {
      cwd: ROOT,
      stdio: 'inherit',
      env: process.env,
    });

    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`Cypress encerrado pelo sinal ${signal}`));
        return;
      }
      resolve(code ?? 1);
    });
  });
}

function stopServer(child) {
  return new Promise((resolve) => {
    if (!child || child.killed || child.exitCode !== null) {
      resolve();
      return;
    }

    const pid = child.pid;
    if (!pid) {
      resolve();
      return;
    }

    treeKill(pid, 'SIGTERM', (error) => {
      if (!error) {
        resolve();
        return;
      }

      // Fallback curto caso SIGTERM não encerre o processo
      treeKill(pid, 'SIGKILL', () => resolve());
    });
  });
}

async function main() {
  if (cypressArgs.length === 0) {
    console.error('Uso: node scripts/with-server.js --spec <arquivo>');
    process.exit(1);
  }

  await assertPortFree(PORT, HOST);

  let serverAlive = true;
  let serverExitInfo = null;

  const server = spawn(
    process.execPath,
    [httpServerBin, path.resolve(ROOT, '../..'), '-a', HOST, '-p', String(PORT), '-c-1', '--silent'],
    {
      cwd: ROOT,
      stdio: 'ignore',
      env: process.env,
    }
  );

  server.on('error', (error) => {
    serverAlive = false;
    serverExitInfo = { error };
  });

  server.on('exit', (code, signal) => {
    serverAlive = false;
    serverExitInfo = { code, signal };
  });

  let exitCode = 1;

  try {
    await waitForHttp200(READY_URL, {
      timeoutMs: 30000,
      isServerAlive: () => serverAlive,
    });

    if (!serverAlive) {
      throw new Error(
        `Servidor HTTP encerrou inesperadamente antes dos testes` +
          (serverExitInfo?.signal
            ? ` (sinal ${serverExitInfo.signal})`
            : serverExitInfo?.code != null
              ? ` (código ${serverExitInfo.code})`
              : '')
      );
    }

    exitCode = await runCypress(cypressArgs);

    if (!serverAlive) {
      console.error(
        'Aviso: o servidor HTTP encerrou durante a execução do Cypress' +
          (serverExitInfo?.signal
            ? ` (sinal ${serverExitInfo.signal})`
            : serverExitInfo?.code != null
              ? ` (código ${serverExitInfo.code})`
              : '')
      );
      exitCode = 1;
    }
  } catch (error) {
    console.error(error.message || error);
    exitCode = 1;
  } finally {
    await stopServer(server);
  }

  process.exit(exitCode);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
