# Kaffa Tech Travel — Teste de QA

Este repositório reúne o site fornecido para a prova e dois testes Cypress da calculadora de orçamento. O relatório com os bugs encontrados na exploração manual será enviado por e-mail.

## Executar os testes

Depois de clonar ou baixar o repositório, abra um terminal na raiz e execute:

```bash
cd entrega-qa/automacao
npm ci
npx cypress install
npx cypress verify
npm test
```

É necessário ter Node.js e npm instalados, acesso à internet para a instalação e a porta 8080 livre. O comando de teste inicia o servidor local e o encerra ao terminar.

**O resultado esperado é um teste aprovado e um reprovado, com código de saída 1.** A reprovação demonstra o bug QA 03: a calculadora gera orçamento mesmo quando o número de pessoas é zero.

| Cenário | Dados | Resultado |
|---|---|---|
| Orçamento válido | Passagem 1500, 2 pessoas, 7 dias | Aprova ao exibir R$ 7500.00 |
| Zero pessoas | Passagem 1500, 0 pessoas, 7 dias | Reprova porque exibe R$ 4500.00 em vez de impedir o cálculo |

Os dois testes usam a data de nascimento 30/07/2005. O primeiro confere a fórmula existente no site. O segundo considera que uma viagem precisa de ao menos um viajante; essa expectativa não está detalhada nas instruções da prova.

## Acompanhar pelo navegador

Após instalar, use dois terminais na pasta `entrega-qa/automacao`:

```bash
# Terminal 1
npm run serve
```

```bash
# Terminal 2
npm run cy:open
```

No Cypress, escolha E2E Testing, selecione um navegador e abra um dos dois specs. Encerre o servidor com Ctrl+C antes de voltar a executar `npm test`.

## Arquivos da entrega

- [Testes e comandos individuais](entrega-qa/automacao/README.md)
- [Resultados e evidências](entrega-qa/automacao/RESULTADOS.md)
- [Instruções originais da prova](INSTRUCOES_PROVA.md)

Testado em Windows, com Node.js 24.18.0, npm 11.16.0, Cypress 14.5.4 e Electron 130. O HTML, CSS e JavaScript do site foram preservados.
