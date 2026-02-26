class Login {
    url = 'https://www.kitapsepeti.com/'
    emailHeader = '#header-email'
    passwordHeader = '#header-password'
    memberLogin = '.member-login-btn'
    loginButton = '#login-btn-322'
    register = '#register-btn-322'
    forgetPassword = '.flex-wrap > .text-gray'
    rememberMe = 'form.w-100 > .flex-wrap > .d-flex'
    email = 'webozgun@gmail.com'
    password = '123Ozgun*'

    navigateUrl() {
        cy.visit(this.url);
    }
    checkemailHeader(emailHeader) {
        cy.get(this.emailHeader).should('be.visible').and('exist')
    }
    checkpasswordHeader(passwordHeader) {
        cy.get(this.passwordHeader).should('be.visible').and('exist')
    }
    checkloginButton(loginButton) {
        cy.get(this.loginButton).should('be.visible').and('exist')
    }
    checkmemberLogin(memberLogin) {
        cy.get(this.memberLogin).should('be.visible').and('exist')
    }
    checkregister(register) {
        cy.get(this.register).should('be.visible').and('exist')
    }
    checkforgetPassword(forgetPassword) {
        cy.get(this.forgetPassword).should('be.visible').and('exist')
    }
    checkrememberMe(rememberMe) {
        cy.get(this.rememberMe).should('be.visible').and('exist')
    }
    clickmemberLogin(memberLogin) {
        cy.get(this.memberLogin).should('be.visible').and('exist').click()
    }
    clickemailHeader(emailHeader) {
        cy.get(this.emailHeader).should('be.visible').and('exist').click()
    }
    clickpasswordHeader(passwordHeader) {
        cy.get(this.passwordHeader).should('be.visible').and('exist').click()
    }
    clickloginButton(loginButton) {
        cy.get(this.loginButton).should('be.visible').and('exist').click()
    }
    
}



export default new Login();


