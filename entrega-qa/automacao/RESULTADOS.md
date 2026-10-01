# Resultados dos testes

Execução registrada em 01/10/2026, em Windows, com Node.js 24.18.0, npm 11.16.0, Cypress 14.5.4 e Electron 130, sem interface gráfica.

Comando executado na pasta `entrega-qa/automacao`: `npm test`.

| Teste | Resultado esperado | Resultado observado | Status |
|---|---|---|---|
| Orçamento válido | R$ 7500.00 | R$ 7500.00 | Aprovado |
| Zero pessoas — QA 03 | Não exibir orçamento | R$ 4500.00 | Reprovado |

Total: **1 aprovado, 1 reprovado; código de saída 1**.

## Dados utilizados

Nos dois cenários, o valor da passagem é 1500, a hospedagem é de sete dias e a data de nascimento é 30/07/2005. O cenário válido usa duas pessoas; o outro usa zero.

No QA 03, a asserção que reprova é:

```javascript
cy.get('#resultadoOrcamento').should('have.text', '');
```

O elemento contém `Orçamento total: R$ 4500.00`. A falha demonstra que o site calcula a estimativa sem validar a quantidade mínima de viajantes.

## Evidências

- [Captura da falha QA 03](evidencias-execucao/QA03-zero-pessoas-falha.png)
- [Vídeo do orçamento válido](evidencias-execucao/calculadora-orcamento-valido.mp4)
- [Vídeo do cenário com zero pessoas](evidencias-execucao/calculadora-zero-pessoas.mp4)

A fórmula do cenário válido e a expectativa de validação estão descritas no [README dos testes](README.md).
