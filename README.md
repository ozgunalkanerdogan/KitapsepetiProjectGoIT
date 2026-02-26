# Kitapsepeti Automation Project
 
## Project Overview

This project is an E2E test automation project developed for kitapsepeti.com using Cypress.

The goal of this project is to automate core e-commerce user flows such as:

- User Login
- Product Search and Filters
- Product Details & Cart
- Cart Control
- Payment Checks
- Guest Transactions

The project is structured using ""Page Object Model (POM)" and "Custom Commands"

---

## Website Under Test

https://www.kitapsepeti.com

---

## Technologies Used

- Cypress
- JavaScript
- Page Object Model (POM)
- DOM Assertions
- Fixtures
- Custom Commands

---

## Project Structure

- cypress/
  - e2e/
    - US01-user.login.cy.js
    - US02-search.cy.js
    - US03-details-cart.cy.js
    - US04-cart-control.cy.js
    - US05-payment.cy.js
    - US06-guest.cy.js
  - fixtures/
    - login.json
  - pages/
    - Login.js
  - support/
    - commands.js

## Page Object Model (POM)

```javascript
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
export default new Login()
```

    

## Custom Commands 

 cypress/support/commands.js

- cy.visitKitapSepeti()
- cy.readyLogin()
- cy.ceviriKurgu()
- cy.toBook()
- cy.toCart()
- cy.clearCart()
- cy.clearCartin()
- cy.buyButton()
- cy.cartButton()

## Test Scenarios

A. User Login

- Login Popup

- Login Forms

- Successful Login

- Successful Login Redirect

- Wrong Email Error

- Wrong Password Error

- Empty Form Validation

- Block After Multiple Attempts

- Forgot Password Button

B. Search and Filters

- Searching with One Character

- Specific Search

- Non-existing Product Search

- Product Items Validation

- Add to Cart Button Visibility

- Sorting Options Check

- Filters Validation

- Main Search Page Control

- Infinite Scroll

C. Product Details & Cart

- Product List Details

- Add To Cart

- Book Information Validation

- Price and Add To Cart Position

- Add To Cart Notification

- Cart Changes

D. Cart Control

- Cart Access
 
- Cart Item Information

- Cart Total Price Verification

- Quantity Increase & Price Check

- Item Deletion

- Clear Cart Button

- Empty Cart Page Validation

- Buy Button Check

- Add to Cart Opens Cart

- Random Product Add to Cart

E. Payment Checks

- Open Payment Page (Address Step)

- Open Payment Page (Payment Step)

- Cargo Options Validation

- Payment Methods Validation

- Payment Information Form Validation

- Payment Button Control

- Payment Error Validation

- Total Price Verification

F. Guest Transactions

- Random Guest Payment

- Continue as Guest Button

- Guest → Address Form

- Address Information Validation

- Blank Form Error

- Address → Order Flow


##

      Özgün Alkan Erdoğan
  Junior QA Automation Engineer
Cypress | JavaScript | E2E Testing