/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

const path = 'http://localhost:3000/use-eye-dropper/playground'

describe('useEyeDropper', () => {
  it('should navigate to the about page', () => {
    cy.visit(path)

    cy.findByText('Open').click()

    cy.focused().click()

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('About Page')
  })
})
