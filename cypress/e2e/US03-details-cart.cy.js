import login from "../pages/login"
describe('Details and Cart', () => {
    beforeEach(() => {
        cy.readyLogin()
    })
    it('US03AC1 Product List Details', () => {

        const searchText = 'ÇeviriKurgu'

        cy.get('[name="q"]').click().type(searchText)
        cy.get('#live-search-btn').click()
        cy.url().should('include', 'arama?q=%C3%87eviriKurgu')
        cy.get('#catalog362 > .col-6').should('exist')
        cy.get('.image-inner > .ls-is-cached').should('be.visible').and('exist').click({ timeout: 10000 })
        cy.url().should('include', 'cevirikurgu')
    })
    it('US03AC2 Add To Cart', () => {
        cy.toBook()
        cy.get('#product-title').should('be.visible').and('exist')
        cy.get('#model-title > span').should('be.visible').and('exist').and('have.text', 'Cazibe Yiğit')
        cy.get('#brand-title').should('be.visible').and('exist').and('have.text', 'Çeviribilim')
        cy.get('.product-price').should('be.visible').and('exist')
    })

    it('US03AC3 Informations about book', () => {
        cy.toBook()
        const bookType = ':nth-child(2) > .d-flex > .book-info-title'
        const bookIsbn = ':nth-child(5) > .d-flex > .book-info-title'
        const bookCover = ':nth-child(3) > .d-flex > .book-info-title'
        const bookPublic = ':nth-child(6) > .d-flex > .book-info-title'
        const bookPage = ':nth-child(4) > .d-flex > .book-info-title'
        const bookPaper = ':nth-child(7) > .d-flex > .book-info-title'
        cy.get('.col-12.mt-1 > .row > .w-100').should('be.visible').and('exist')
        cy.get(bookType).should('be.visible').and('exist')
        cy.get(bookIsbn).should('be.visible').and('exist')
        cy.get(bookCover).should('be.visible').and('exist')
        cy.get(bookPublic).should('be.visible').and('exist')
        cy.get(bookPage).should('be.visible').and('exist')
        cy.get(bookPaper).should('be.visible').and('exist')
    })
    it('US03AC4 Controlling place of price and add cart', () => {
        cy.toBook()
        cy.get('.product-price').should('be.visible').and('exist')
        cy.get('#addToCartBtn').should('be.visible').and('exist')
        cy.get('#product-right').within(() => {
            cy.get('.product-price').then((price) => {
                const priceBottom = price[0].getBoundingClientRect().bottom
                cy.get('#addToCartBtn').then((btn) => {
                    const btnTop = btn[0].getBoundingClientRect().top
                    expect(btnTop).to.be.greaterThan(priceBottom)
                })
            })

        })
    })
    it('US03AC5 Add To Cart Notification', () => {
        cy.toBook()
        cy.get('#addToCartBtn').should('be.visible').and('exist').click()
        cy.get('#popup-cart', { timeout: 15000 }).should('be.visible').and('exist').within(() => {
            cy.contains('Ürün Başarıyla Sepete Eklendi').should('be.visible').and('exist')
            cy.contains('Sepete Git').should('be.visible').and('exist')
            cy.contains('Satın Al').should('be.visible').and('exist')
        })
        cy.clearCart()
    })

    it('US03AC6 Cart Changes', () => {
        cy.toCart()


        cy.intercept('POST', 'add-to-cart').as('addCart')
        cy.get('.badge').invoke('text').then(text => Number(text.trim())).then((cBefore) => {
            cy.get('.product-item').first().trigger('mouseover')
            cy.get('.add-to-cart-btn').first().click({ force: true })
            cy.wait('@addCart').its('response.statusCode').should('eq', 200)
            cy.get('.badge', { timeout: 10000 }).should(($el) => {
                const cAfter = Number($el.text().trim())
                expect(cAfter).to.eq(cBefore + 1)
            })
        })
        cy.clearCart()
    })


})


