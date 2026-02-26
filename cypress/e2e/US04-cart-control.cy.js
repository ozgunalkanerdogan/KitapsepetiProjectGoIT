import login from "../pages/login"
describe('Cart Options/Control', () => {
    beforeEach(() => {
        cy.readyLogin()
    })

    it('US04AC1 Cart Access', () => {
        cy.toCart()
        cy.cartButton()
        cy.url().should('include', 'sepet')

        let sum = 0
        let errorMessage = ''
        cy.get('.fw-black > .pl-0').each(($el) => {

            const text = $el.text()

            const price = Number(
                text
                    .replace('TL', '')
                    .replace(/\./g, '')
                    .replace(',', '.')
                    .trim()
            )

            sum += price

        }).then(() => {
            cy.get('.fw-bold > .pl-0')
                .invoke('text')
                .then((totalText) => {
                    const total = Number(totalText
                        .replace('TL', '')
                        .replace(/\./g, '')
                        .replace(',', '.')
                        .trim())
                    if (sum !== total) {
                        errorMessage = `Error calculating ${sum} but total is ${total}`
                    }
                })

        }).then(() => {

            if (errorMessage !== '') {
                throw new Error(errorMessage)
            }
        })
        cy.clearCartin()
    })

    it('US04AC2 Cart Information Items', () => {
        cy.toCart()
        cy.cartButton()
        const quantityS = '#qty5410720'
        const cartTitle = '.cart-item-title'
        const unitPrice = '.d-flex > .price-sell'
        const unitTotal = '.col-4 > .price-sell'
        cy.get(unitPrice).should('be.visible').and('exist')
        cy.get(cartTitle).should('be.visible').and('exist')
        cy.get(quantityS).should('be.visible').and('exist')
        cy.get(unitTotal).should('be.visible').and('exist')
        cy.clearCartin()

    })
    it('US04AC3 Cart Total Price Check', () => {

        cy.toCart()
        cy.cartButton()
        cy.url().should('include', 'sepet')

        const parsePrice = (text) => {
            return Number(text
                .replace('TL', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim()
            )
        }

        cy.get('.fw-black > .pl-0').invoke('text').then((subText) => {

            const subtotal = parsePrice(subText)
            cy.get(':nth-child(2) > .pl-0').invoke('text').then((cargoText) => {
                const cargo = parsePrice(cargoText)
                cy.get('.fw-bold > .pl-0').invoke('text').then((totalText) => {
                    const total = parsePrice(totalText)
                    const expectedTotal = subtotal + cargo
                    expect(total).to.eq(expectedTotal)
                })
            })
        })
        cy.clearCartin()
    })

    it('US04AC4 Cart Quantity +, Price Check', () => {

        cy.toCart()
        cy.cartButton()
        cy.url().should('include', 'sepet')

        const parsePrice = (text) => Number(
            text.replace('TL', '').replace(/\./g, '').replace(',', '.').trim()
        )

        const cartTotal = '.fw-black > .pl-0'
        const generalTotal = '.fw-bold > .pl-0'
        const cargoPrice = ':nth-child(2) > .pl-0'
        const qtyPlus = '#qty-plus5410720'
        const qtyInput = '#qty5410720'

        cy.get(qtyInput).invoke('val').then((initialQty) => {
            const qtyBefore = Number(initialQty)
            cy.get(cartTotal).invoke('text').then((subText) => {
                const subtotalBefore = parsePrice(subText)

                cy.get(cargoPrice).invoke('text').then((cargoText) => {
                    const cargo = parsePrice(cargoText)

                    const firstTotal = subtotalBefore + cargo
                    cy.get(qtyPlus).click()
                    cy.get(qtyInput).invoke('val').should('eq', String(qtyBefore + 1))
                    cy.get(cartTotal).invoke('text').then((subAfterText) => {
                        const subtotalAfter = parsePrice(subAfterText)

                        const expectedTotal = subtotalAfter + cargo
                        cy.get(generalTotal).invoke('text').then((secondGeneralTotalText) => {
                            const secondTotal = parsePrice(secondGeneralTotalText)

                            expect(secondTotal).to.eq(expectedTotal)
                        })
                    })
                })
            })
        })

        cy.clearCartin()
    })
    it('US04AC5 Item delete in Cart', () => {
        cy.toCart()
        cy.cartButton()
        cy.get('#delete-product-5410720 > .ti-trash-o').should('be.visible').and('exist').click({ force: true })
        cy.get('.t-popconfirm-inner').should('be.visible').and('exist').contains('Silmek istediğinize emin misiniz?')
        cy.get('.t-popconfirm-buttons > .btn-light').should('be.visible').and('exist').click({ force: true })
        cy.get('.cart-item').should('have.length', 0)

    })
    it('US04AC6 Clear button in Cart', () => {
        cy.toCart()
        cy.cartButton()
        cy.get('#clear-cart-btn-129').should('be.visible').and('exist').click({ force: true })
        cy.get('.cart-item').should('have.length', 0)
    })
    it('US04AC7 Page Information after Cart Clear', () => {
        cy.toCart()
        cy.cartButton()
        cy.get('#clear-cart-btn-129').should('be.visible').and('exist').click({ force: true })
        cy.get('.cart-item').should('have.length', 0)
        cy.get('#cart-back-btn').should('be.visible').contains('Alışverişe Devam Et')
    })

    it('US04AC8 Add to cart and Buy Button Check', () => {
        cy.toCart()
        cy.get('#header-cart-btn').should('be.visible').and('exist').click({ force: true })
        cy.get('#go-order-btn').should('be.visible').and('exist').and('not.be.disabled')

    })
    it('US04AC9 Checkin Add to cart button opens Cart', () => {
        cy.toBook()
        cy.get('#addToCartBtn').should('be.visible').and('exist').click({ force: true })
        cy.get('#popup-cart').should('be.visible').and('exist')
        cy.get('#cart-popup-go-cart').should('be.visible').and('exist').click({ force: true })
        cy.get('#clear-cart-btn-129').should('be.visible').and('exist').click({ force: true })
    })
    it('US04AC10 Random product add to cart', () => {
        cy.wait(2000)
        cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

            const randomIndex = Math.floor(Math.random() * $buttons.length)

            cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
            cy.get('#cart-popup-go-cart').click()
            cy.get('#clear-cart-btn-129').should('be.visible').and('exist').click({ force: true })
        })
    })

})