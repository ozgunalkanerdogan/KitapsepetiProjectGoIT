import login from "../pages/login"
describe('Search and Filters', () => {
    beforeEach(() => {
        cy.readyLogin()
    })

    it('US02AC1 Searching with one character', () => {

        cy.get('[name="q"]').click().type('a')
        cy.get('#live-search-btn').click()
        cy.url().should('include', 'arama?q=a')

    })

    it('US02AC2 Specific Search', () => {

        cy.ceviriKurgu()

    })

    it('US02AC3 Searching nonexist product', () => {

        const searchText = '3452fdg'

        cy.get('[name="q"]').click().type(searchText)
        cy.get('#live-search-btn').click()
        cy.url().should('include', 'arama?q=3452fdg')
        cy.get('.product-list').should('have.length', 0).and('not.exist')
    })

    it('US02AC4 Product Items', () => {

        cy.ceviriKurgu()
        cy.get('#catalog362 > .col-6').should('exist')
        cy.get('.image-inner > .ls-is-cached').should('be.visible').and('exist')
        cy.get('#product-title-541072362').should('be.visible').and('exist').and('have.text', 'Çevirikurgu')
        cy.get('#brand-title-541072362').should('be.visible').and('exist').and('have.text', 'Çeviribilim')
        cy.get('.product-price').should('be.visible').and('exist')

    })
    it('US02AC5 Checking "Add to Cart" button visibility', () => {
        const searchText = 'ÇeviriKurgu'

        cy.visit('https://www.kitapsepeti.com/')

        cy.get('[name="q"]').clear().type(searchText)
        cy.get('#live-search-btn').click()

        cy.url().should('include', 'arama?q=%C3%87eviriKurgu')
        cy.get('#catalog362 > .col-6').should('exist')

        cy.get('#catalog362 > .col-6').first().as('card')
        cy.get('@card').find('[id^="product-addcart-button-"]').should('have.css', 'visibility', 'hidden')
        cy.get('@card').scrollIntoView().realHover()
        cy.get('@card').find('[id^="product-addcart-button-"]', { timeout: 15000 }).should('have.css', 'visibility', 'visible').and('contain', 'Sepete Ekle')
    })

    it('US02AC6 Checking Sorting Options', () => {

        cy.ceviriKurgu()
        cy.get('select[name*="sort"], select[id*="sort"]').should('be.visible')


        const sortingOptions = [
            "Yeniden Eskiye",
            "Eskiden Yeniye",
            "Fiyat Artan",
            "Fiyat Azalan",
            "Varsayılan Sıralama"
        ]
        sortingOptions.forEach(option => {
            cy.contains(option).should('be.visible').and('exist');

        });
    }) 

    it('US02AC7 Filters', () => {

        cy.ceviriKurgu()
        const categories = '#accordion-categories-361'
        const deneme = '#filter-categories-606'
        const brand = '#accordion-brand-361'
        const brandLabel = '#label-brand542'
        const brandBox = '#brand_542'
        const brandCheck = '#label-brand542 .ti-check'
        const model = '#accordion-model-361'
        const modelLabel ='#label-model152296'
        const modelCheck = '#label-model152296 > .input-checkbox > .ti-check'
        cy.get(categories, { timeout : 10000 }).should('be.visible').and('exist').and('have.text', ' Kategoriler ')
        cy.get(deneme).should('be.visible').and('exist').click()
        cy.url().should('include', 'category=606')
        cy.go('back')
        cy.get(brand, { timeout : 10000 }).should('be.visible').and('exist').and('have.text', ' Marka ')
        cy.get(brandLabel).should('be.visible')
        cy.get(brandBox).should('not.be.checked')
        cy.get(brandBox).check({ force: true }).should('be.checked')
        cy.get(brandLabel).should('have.class', 'filter-item-active')
        cy.get(brandCheck).should('be.visible')
        cy.scrollTo('center')
        cy.get(model, { timeout : 10000 }).should('be.visible').and('exist').and('have.text', ' Model ')
        cy.get(modelLabel).should('be.visible')
        cy.get(modelLabel).should('not.be.checked')
        cy.get('#model_152296').check({ force: true }).should('be.checked')
        cy.get(modelLabel).should('have.class', 'filter-item-active')
        cy.get(modelCheck).should('be.visible')
    })



    it('US02AC8 Main SearchPage', () => {

        cy.get('#menu-12322').should('be.visible').and('exist')
        cy.get('#menu-12322', { timeout: 5000 }).click({ force: true })
        cy.url().should('eq', 'https://www.kitapsepeti.com/bilimkurgu')
        cy.get('.product-item, .product').should('exist')
    })

    it('US02AC9 Infinite Scroll', () => {

        const searchText = 'Bilim Kurgu'

        cy.get('[name="q"]').click().type(searchText)
        cy.get('#live-search-btn').click()
        cy.url().should('include', 'arama?q=Bilim+Kurgu')
        cy.get('.product-item, .product')
            .its('length')
            .then((firstCount) => {

                cy.scrollTo('bottom', { duration: 3000 })

                cy.get('.product-item, .product', { timeout: 15000 })
                    .its('length')
                    .should('be.gt', firstCount)
            })
    })
})