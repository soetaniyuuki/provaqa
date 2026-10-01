# Testes da calculadora

Os dois cenários estão em [cypress/e2e](cypress/e2e). Cada teste abre a página inicial e preenche os campos de forma independente.

## Comandos

Execute nesta pasta, após seguir a [instalação no README principal](../../README.md):

| Comando | Uso |
|---|---|
| `npm test` | Executa os dois cenários |
| `npm run test:pass` | Executa somente o orçamento válido |
| `npm run test:fail` | Executa somente o cenário de zero pessoas |
| `npm run serve` | Inicia o site em http://127.0.0.1:8080 |
| `npm run cy:open` | Abre a interface do Cypress; requer o servidor em outro terminal |

Os comandos `test`, `test:pass` e `test:fail` gerenciam o servidor automaticamente. A porta 8080 deve estar livre.

## O que é verificado

**Orçamento válido:** passagem de 1500, duas pessoas e sete dias. O resultado esperado é `Orçamento total: R$ 7500.00`, conforme a fórmula implementada: `1500 * 2 + 500 * 7 + 1000`. As instruções da prova não definem uma fórmula comercial independente.

**Zero pessoas — QA 03:** mantém passagem e hospedagem válidas, mas informa zero viajantes. O teste espera que nenhum orçamento seja exibido. Atualmente, o site apresenta `Orçamento total: R$ 4500.00`, causando a reprovação. A exigência de ao menos um viajante é uma expectativa funcional inferida.

Assim, `npm test` e `npm run test:fail` devem retornar código 1 pela falha de validação; `npm run test:pass` deve retornar 0. Erros de instalação ou inicialização não são a falha esperada da prova.

## Evidências

O [registro de resultados](RESULTADOS.md) contém os valores observados e os links para as capturas e vídeos selecionados. A cada execução, o Cypress também gera arquivos locais em `cypress/screenshots` e `cypress/videos`, que não são versionados.
