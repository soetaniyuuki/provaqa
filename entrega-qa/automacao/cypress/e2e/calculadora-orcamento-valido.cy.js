describe('Calculadora de orçamento — dados válidos', () => {
  it('calcula o orçamento com dados válidos e exibe R$ 7500.00', () => {
    cy.visit('/index.html');

    cy.get('#valorPassagem').clear().type('1500');
    cy.get('#numeroPessoas').clear().type('2');
    cy.get('#diasHospedagem').clear().type('7');
    cy.get('#dataNascimento').clear().type('2005-07-30');

    cy.contains('button', 'Calcular Orçamento').click();

    // Fórmula atual no site: passagem*pessoas + 500*dias + 1000
    cy.get('#resultadoOrcamento')
      .should('be.visible')
      .and('have.text', 'Orçamento total: R$ 7500.00');
  });
});
