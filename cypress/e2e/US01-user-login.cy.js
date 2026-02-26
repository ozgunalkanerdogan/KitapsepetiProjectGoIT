import login from "../pages/login"
describe('User Login', () => {

  beforeEach(() => {
    cy.visitKitapSepeti()
  })
  it('US01AC1 Login Popup', function () {
    login.navigateUrl();

  })

  it('US01AC2 Login Forms', function () {
    login.checkmemberLogin
    login.checkemailHeader
    login.checkpasswordHeader
    login.checkforgetPassword
    login.checkrememberMe
    login.checkloginButton
    login.checkregister
  })

  it('US01AC3 Succeed Login', function () {
    cy.fixture('login').then((data) => {
      login.clickmemberLogin()
      login.clickemailHeader()
      cy.get('#header-email').type(data.username)
      login.clickpasswordHeader()
      cy.get('#header-password').type(data.password)
      cy.get('#login-btn-322').click()
    })
  })

  it('US01AC4 Succeed Login Page', function () {
    const rq = {
      method: 'GET',
      url: "https://www.kitapsepeti.com/srv/service/profile/get-shopping-list"
    }
    cy.request(rq).then((response) => {
      assert.equal(response.status, 200);
      expect(response.status).to.eq(200);
      console.log("response ::::::::", response)
      cy.log(response)
    })

    cy.fixture('login').then((data) => {
      login.clickmemberLogin()
      login.clickemailHeader()
      cy.get('#header-email').type(data.username)
      login.clickpasswordHeader()
      cy.get('#header-password').type(data.password)
      cy.get('#login-btn-322').click()
      cy.get('#header-account > .d-none').should('be.visible').and('exist')
    })

  })

  it('US01AC5 Wrong Email Error', function () {
    login.clickmemberLogin()
    cy.fixture('login').then((data) => {
      cy.get('#header-email').type('webozgn@gmail.com')
      cy.get('#header-password').type(data.password)
      login.clickloginButton()
    })
    cy.contains(/hatalı/i).then((el) => {
      console.log(el.text())
    })
  })


  it('US01AC6 Wrong Password Error', function () {
    login.clickmemberLogin()
    cy.fixture('login').then((data) => {
      cy.get('#header-email').type(data.username)
      cy.get('#header-password').type('123Ozgun-')
      login.clickloginButton()


      cy.contains(/hatalı/i).then((el) => {
        console.log(el.text())
      })
    })
  })

  it('US01AC07 Empty Forms', () => {

    login.clickmemberLogin()
    login.clickloginButton()

    cy.contains(/hatalı/i).then((el) => {
      console.log(el.text())

    })

  })
  it('US01AC08 Block after too many tries', () => {

    login.clickmemberLogin()
    cy.fixture('login').then((data) => {
      for (let i = 0; i < 15; i++) {
        cy.get('#header-email').clear().type('webozgn.gmail.com')
        cy.get('#header-password').clear().type(data.password)
        login.clickloginButton()
      }

      cy.contains('Çok fazla istek talebinde bulundunuz').should('be.visible')

    })
  })
  it('US01AC09 Forgot Password Button', () => {

    login.clickmemberLogin()
    cy.get('.flex-wrap > .text-gray').should('be.visible').and('exist').click()
    cy.url().should('eq', 'https://www.kitapsepeti.com/uye-sifre-hatirlat')
    cy.get('.block-title').should('be.visible').and('exist').and('have.text', 'Şifremi Unuttum')
    cy.get('[name="forgot-email"]').should('be.visible').and('exist')
    cy.get('#forgot-password-btn-292').should('be.visible').and('exist').and('have.text', 'Şifremi Hatırlat')
  })
})

