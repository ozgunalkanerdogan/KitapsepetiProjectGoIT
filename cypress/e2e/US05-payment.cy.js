import login from "../pages/login"
describe('Payment Checks', () => {
    beforeEach(() => {
        cy.readyLogin()
    })

    it('US05AC1 Opening Payment Page/Adress', () => {
        cy.toCart()
        cy.buyButton()
        cy.url({ timeout: 5000 }).should('include', '/order')
        cy.clearCartin()
    })

    it('US05AC1/Negative Opening Payment Page/Adress', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('not.include', '/address')
        cy.clearCartin()

    })
    it('US05AC2 Opening Payment Page/Payment', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span', { timeout : 5000 }).should('be.visible').and('exist').click({ force: true })
        cy.url().should('include', '/payment')
        cy.clearCartin()

    })
    it('US05AC2/Negative Opening Payment Page/Payment', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span').should('be.visible').and('exist').click({ force: true })
        cy.url().should('not.include', '/adress')
        cy.clearCartin()

    })
    it('US05AC3 Opening Payment Page/Cargos', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span').should('be.visible').and('exist').click({ force: true })
        cy.url().should('include', '/payment')
        cy.contains('strong', 'PTT Kargo').closest('li.cargo-option-item').should('have.class', 'active')
        cy.contains('strong', 'HEPSİJET').closest('li.cargo-option-item')
        cy.clearCartin()
    })
    it('US05AC3/Negative Opening Payment Page/Cargos', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span').should('be.visible').and('exist').click({ force: true })
        cy.url().should('include', '/payment')
        cy.contains('strong', 'PTT Kargo').closest('li.cargo-option-item').should('have.class', 'active')
        cy.contains('strong', 'HEPSİJET').closest('li.cargo-option-item').should('not.have.class', 'active')

        cy.clearCartin()
    })

    it('US05AC4 Opening Payment Page/Payment Methods', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span').should('be.visible').and('exist').click({ force: true })
        cy.url().should('include', '/payment')
        cy.get('#iyz-tab-credit-card').should('be.visible').and('exist')
        cy.get('#iyz-tab-payWithIyzico').should('be.visible').and('exist')
        cy.clearCartin()
    })
    it('US05AC5 Opening Payment Page/Payment Informations', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span').should('be.visible').and('exist').click({ force: true })
        cy.url().should('include', '/payment')
        cy.get('#iyz-tab-credit-card', { timeout: 5000 }).should('be.visible').and('exist').click()
        cy.get('[name="cardHolderName"]').should('be.visible').and('exist')
        cy.get('#ccnumber').should('be.visible').and('exist')
        cy.get('#ccexp').should('be.visible').and('exist')
        cy.get('#cccvc').should('be.visible').and('exist')

    })

    it('US05AC6 Opening Payment Page/Payment Button Check', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span').should('be.visible').and('exist').click({ force: true })
        cy.url().should('include', '/payment')
        cy.get('#iyz-tab-credit-card', { timeout: 5000 }).should('be.visible').and('exist').click()
        cy.get('#iyz-payment-button', { timeout: 5000 }).should('have.css', 'background-color', 'rgb(206, 212, 218)')
        cy.get('[name="cardHolderName"]').should('be.visible').and('exist').type('ozgun erdogan')
        cy.get('#ccnumber').should('be.visible').and('exist').type('4282 2090 0434 8015')
        cy.get('#ccexp').should('be.visible').and('exist').type('12/26')
        cy.get('#cccvc').should('be.visible').and('exist').type('543')
        cy.get('#iyz-payment-button', { timeout: 5000 }).should('have.css', 'background-color', 'rgb(30, 100, 255)')
        cy.clearCartin()

    })
    it('US05AC7 Opening Payment Page/Payment Error', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span').should('be.visible').and('exist').click({ force: true })
        cy.url().should('include', '/payment')
        cy.get('#iyz-tab-credit-card', { timeout: 5000 }).should('be.visible').and('exist').click()
        cy.get('[name="cardHolderName"]').should('be.visible').and('exist')
        cy.get('#ccnumber').should('be.visible').and('exist')
        cy.get('#ccexp').should('be.visible').and('exist')
        cy.get('#cccvc').should('be.visible').and('exist')
        cy.get('#iyz-payment-button', { timeout: 5000 }).should('have.css', 'background-color', 'rgb(206, 212, 218)').click()
        cy.get('.css-1begxyj-ErrorLabelWrapper').should('be.visible').and('exist')
        cy.clearCartin()
    })
    it('US05AC8 Opening Payment Page/Total Price Verification', () => {
        cy.toCart()
        cy.buyButton()
        cy.url().should('include', '/order')
        cy.get('.col-7 > .btn > span').should('be.visible').and('exist').click({ force: true })
        cy.url().should('include', '/payment')
        cy.get('.order-rightbar-sticky').should('be.visible').and('exist')
        cy.wait(3000)
        const parsePrice = (text) => {
            return Number(
                text
                    .replace('TL', '')
                    .replace('₺', '')
                    .replace(/\./g, '')
                    .replace(',', '.')
                    .replace(/[^\d.]/g, '')
                    .trim()
            )
        }
        cy.get('.fw-bold > :nth-child(2)').invoke('text').then((generalText) => {

            const generalTotal = parsePrice(generalText)

            cy.get('#iyz-payment-button').invoke('text').then((buttonText) => {

                const buttonTotal = parsePrice(buttonText)

                expect(buttonTotal).to.eq(generalTotal)
            })
        })
        cy.clearCartin()
    })
})

