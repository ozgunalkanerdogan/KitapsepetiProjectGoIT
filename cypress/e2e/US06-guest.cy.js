import login from "../pages/login"
describe('Guest Transactions ', () => {
    beforeEach(() => {
        cy.visitKitapSepeti()
    })
    it('US06AC1 Random Payment as Guest', () => {

        cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

            const randomIndex = Math.floor(Math.random() * $buttons.length)
            cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
            cy.get('#cart-popup-continue-shopping').should('be.visible').click()
            cy.url().should('include', '/siparis-uye-giris')
        })
    })
    it('US06AC1/Negative Random Payment/Add to Cart as Guest', () => {

        cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

            const randomIndex = Math.floor(Math.random() * $buttons.length)
            cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
            cy.get('#cart-popup-go-cart').should('be.visible').click()
            cy.url().should('not.include', '/siparis-uye-giris')
        })
    })
        it('US06AC2 Continue as Guest Button', () => {

            cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

                const randomIndex = Math.floor(Math.random() * $buttons.length)
                cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
                cy.get('#cart-popup-continue-shopping').should('be.visible').click()
                cy.url().should('include', '/siparis-uye-giris')
                cy.get('#membership-form-131 > .w-100').should('be.visible').and('have.css', 'background-color', 'rgb(44, 42, 40)')

            })
        })
        it('US06AC2/Negative Continue as Guest Button', () => {

            cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

                const randomIndex = Math.floor(Math.random() * $buttons.length)
                cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
                cy.get('#cart-popup-continue-shopping').should('be.visible').click()
                cy.url().should('include', '/siparis-uye-giris')
                cy.get('#membership-form-131 > .w-100').should('be.visible').and('have.css', 'background-color', 'rgb(44, 42, 40)').and('not.be.disabled')

            })
        })
        it('US06AC3 Continue as Guest to Payment/Adress Form', () => {

            cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

                const randomIndex = Math.floor(Math.random() * $buttons.length)
                cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
                cy.get('#cart-popup-continue-shopping').should('be.visible').click()
                cy.url().should('include', '/siparis-uye-giris')
                cy.get('#membership-form-131 > .w-100').should('be.visible').and('have.css', 'background-color', 'rgb(44, 42, 40)').click()
                cy.url().should('include', '/order/address')
            })
        })
        it('US06AC4 Payment Page/Adress Informations', () => {

            cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

                const randomIndex = Math.floor(Math.random() * $buttons.length)
                cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
                cy.get('#cart-popup-continue-shopping').should('be.visible').click()
                cy.url().should('include', '/siparis-uye-giris')
                cy.get('#membership-form-131 > .w-100').should('be.visible').and('have.css', 'background-color', 'rgb(44, 42, 40)').click()
                cy.url().should('include', '/order/address')
                cy.get('[name="is_company_active"]').should('exist').and('be.visible')
                cy.get('[name="email"]').should('exist').and('be.visible')
                cy.get('[name="fullname"]').should('exist').and('be.visible')
                cy.get('[name="country_code"]').should('exist').and('be.visible')
                cy.get('[name="city_code"]').should('exist').and('be.visible')
                cy.get('[name="town"]').should('exist').and('be.visible')
                cy.get('[name="district"]').should('exist').and('be.visible')
                cy.get('[name="address"]').should('exist').and('be.visible')
                cy.get('[name="post_code"]').should('exist').and('be.visible')
                cy.get('[name="mobile_phone"]').should('exist').and('be.visible')
            })
        })
        it('US06AC5 Payment Page/Blank Error ', () => {

            cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

                const randomIndex = Math.floor(Math.random() * $buttons.length)
                cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
                cy.get('#cart-popup-continue-shopping').should('be.visible').click()
                cy.url().should('include', '/siparis-uye-giris')
                cy.get('#membership-form-131 > .w-100').should('be.visible').and('have.css', 'background-color', 'rgb(44, 42, 40)').click()
                cy.url().should('include', '/order/address')
                cy.get('[name="fullname"]').should('exist').and('be.visible').type(' ')
                cy.get('.col-12 > .btn').click()
                cy.get('.popover-item').should('be.visible').and('contain', 'Lütfen bu alanı doldurunuz').and('have.css', 'color', 'rgb(228, 36, 55)')
            })
        })
        it('US06AC6 Continue Payment/Adress to Order', () => {

            cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

                const randomIndex = Math.floor(Math.random() * $buttons.length)
                cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
                cy.get('#cart-popup-continue-shopping').should('be.visible').click()
                cy.url().should('include', '/siparis-uye-giris')
                cy.get('#membership-form-131 > .w-100').should('be.visible').and('have.css', 'background-color', 'rgb(44, 42, 40)').click()
                cy.url().should('include', '/order/address')
                cy.get('[name="email"]').type('goitozgun@gmail.com')
                cy.get('[name="fullname"]').type('ozgun erdogan')
                cy.get('select[name="city_code"]').select('İstanbul')
                cy.get('select[name="town_code"]').select('Beykoz')
                cy.get('select[name="district_code"]').select('RİVA MAH')
                let randomText = ''
                const letters = 'abcdefghijklmnopqrstuvwxyz'

                for (let i = 0; i < 30; i++) {
                    const randomIndex = Math.floor(Math.random() * letters.length)
                    randomText += letters[randomIndex]
                }

                cy.get('[name="address"]').type(randomText)
                cy.get('[name="mobile_phone"]').type('9898988989')
                cy.get('.col-12 > .btn > span').click()
                cy.url().should('include', '/order/payment')
            })
        })

        it('US06AC6/Negative Continue Payment/Adress to Order', () => {

            cy.get('[id^="product-addcart-button-"]').then(($buttons) => {

                const randomIndex = Math.floor(Math.random() * $buttons.length)
                cy.wrap($buttons[randomIndex]).scrollIntoView().click({ force: true })
                cy.get('#cart-popup-continue-shopping').should('be.visible').click()
                cy.url().should('include', '/siparis-uye-giris')
                cy.get('#membership-form-131 > .w-100').should('be.visible').and('have.css', 'background-color', 'rgb(44, 42, 40)').click()
                cy.url().should('include', '/order/address')
                cy.get('[name="email"]').type(' ')
                cy.get('[name="fullname"]').type('ozgun erdogan')
                cy.get('select[name="city_code"]').select('İstanbul')
                cy.get('select[name="town_code"]').select('Beykoz')
                cy.get('select[name="district_code"]').select('RİVA MAH')
                let randomText = ''
                const letters = 'abcdefghijklmnopqrstuvwxyz'

                for (let i = 0; i < 30; i++) {
                    const randomIndex = Math.floor(Math.random() * letters.length)
                    randomText += letters[randomIndex]
                }

                cy.get('[name="address"]').type(randomText)
                cy.get('[name="mobile_phone"]').type('9898988989')
                cy.get('.col-12 > .btn > span').click()
                cy.url().should('not.include', '/order/payment')
            })
        })
    })

