// Tüm test başlangıçlarında siteye giriş, cookie iptali ve ilk çıkan pop-up kapatmak için kullanıyorum.

Cypress.Commands.add('visitKitapSepeti', () => {
  cy.visit('https://www.kitapsepeti.com/')
  cy.get('.cc-nb-okagree').click()
  cy.get('#t-modal-close-1 > .ti-close').click()
})

Cypress.Commands.add('readyLogin', () => {
  cy.visit('https://www.kitapsepeti.com/')
  cy.get('.cc-nb-okagree').click()
  cy.get('#t-modal-close-1 > .ti-close').click()
  cy.get('.member-login-btn').click()
  cy.get('#header-email').should('be.visible').and('exist').click().type('webozgun@gmail.com')
  cy.get('#header-password').should('be.visible').and('exist').click().type('123Ozgun*')
  cy.get('#login-btn-322').should('be.visible').and('exist').click()
})

Cypress.Commands.add('ceviriKurgu', () => {
  const searchText = 'ÇeviriKurgu'

        cy.get('[name="q"]').click().type(searchText)
        cy.get('#live-search-btn').click()
        cy.url().should('include', 'arama?q=%C3%87eviriKurgu')
        cy.get('#catalog362 > .col-6').should('exist')
        cy.get('[name="q"]').should('have.value', '')
})

Cypress.Commands.add('toBook', () => {
  const searchText = 'ÇeviriKurgu'

  cy.get('[name="q"]').click().type(searchText)
  cy.get('#live-search-btn').click()
  cy.url().should('include', 'arama?q=%C3%87eviriKurgu')
  cy.get('#catalog362 > .col-6').should('exist')
  cy.get('.image-inner > .ls-is-cached').should('be.visible').and('exist').click({ timeout: 10000 })
  cy.url().should('include', 'cevirikurgu')
})

Cypress.Commands.add('toCart', () => {
  const searchText = 'ÇeviriKurgu'
  cy.get('[name="q"]').click().type(searchText)
  cy.get('#live-search-btn').click()
  cy.url().should('include', 'arama?q=%C3%87eviriKurgu')
  cy.get('body', { timeout: 15000 }).should('not.have.class', 'is-loading')
  cy.get('#catalog362 > .col-6').first().as('card')
  cy.get('@card').find('[id^="product-addcart-button-"]').should('have.css', 'visibility', 'hidden')
  cy.get('@card').scrollIntoView().realHover()
  cy.get('body', { timeout: 20000 }).should('not.have.class', 'is-loading')
  cy.get('@card', { timeout: 15000 }).find('[id^="product-addcart-button-"]').should('be.visible').and('contain', 'Sepete Ekle').click()
  cy.get('#popup-cart', { timeout: 10000 }).should('be.visible').and('exist')
  cy.get('#t-modal-close-1').click({ force: true })
})


Cypress.Commands.add('clearCart', () => {
  cy.get('#t-modal-close-1 > .ti-close').should('be.visible').and('exist').click()
  cy.get('#header-cart-btn > .d-none').should('be.visible').and('exist').click({ force: true })
  cy.get('.cart-item-delete-btn.mr-1.mt-1', { timeout: 15000 }).should('have.length.greaterThan', 0)
  cy.get('.cart-item-delete-btn.mr-1.mt-1').first().click({ force: true })
  cy.contains('Sepetinizde ürün bulunmamaktadır').should('be.visible').and('exist')
  cy.get('#header-cart-panel-close > .ti-close').click({ force: true })
})

Cypress.Commands.add('clearCartin', () => {
  cy.get('#header-cart-btn > .d-none').and('exist').click({ force: true })
  cy.get('.cart-item-delete-btn.mr-1.mt-1', { timeout: 15000 }).should('have.length.greaterThan', 0)
  cy.get('.cart-item-delete-btn.mr-1.mt-1').first().click({ force: true })
  cy.contains('Sepetinizde ürün bulunmamaktadır')
  cy.get('#header-cart-panel-close > .ti-close').click({ force: true })
})

Cypress.Commands.add('buyButton', () => {
  cy.get('#header-cart-btn').should('be.visible').and('exist').click({ force: true })
  cy.get('#go-cart-btn').should('be.visible').and('exist').click({ force: true })
  cy.get('#cart-buy-btn').should('be.visible').and('exist').click({ force: true })
})
Cypress.Commands.add('cartButton', () => {
cy.get('#header-cart-btn').should('be.visible').and('exist').click({ force: true })
cy.get('#go-cart-btn').should('be.visible').and('exist').click({ force: true })
})
import "cypress-real-events/support";