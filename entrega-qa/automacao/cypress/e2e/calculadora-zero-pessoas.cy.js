describe('Calculadora de orçamento — zero pessoas (QA 03)', () => {
  it('impede orçamento quando o número de pessoas é zero', () => {
    // Expectativa funcional inferida: ao menos 1 viajante.
    // Não está explicitada no README; o site atual aceita 0 e calcula mesmo assim.
    cy.visit('/index.html');

    cy.get('#resultadoOrcamento').should('have.text', '');

    cy.get('#valorPassagem').clear().type('1500');
    cy.get('#numeroPessoas').clear().type('0');
    cy.get('#diasHospedagem').clear().type('7');
    cy.get('#dataNascimento').clear().type('2005-07-30');

    cy.contains('button', 'Calcular Orçamento').click();

    // Deve falhar aqui: o site preenche o resultado mesmo sem viajantes.
    cy.get('#resultadoOrcamento').should('have.text', '');
  });
});
