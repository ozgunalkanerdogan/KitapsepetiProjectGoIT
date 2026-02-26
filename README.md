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

 - cypress/support/commands.js -

-> cy.visitKitapSepeti()
-> cy.readyLogin()
-> cy.ceviriKurgu()
-> cy.toBook()
-> cy.toCart()
-> cy.clearCart()
-> cy.clearCartin()
-> cy.buyButton()
-> cy.cartButton()

## Test Scenarios

A. User Login

1 Login Popup

2 Login Forms

3 Successful Login

4 Successful Login Redirect

5 Wrong Email Error

6 Wrong Password Error

7 Empty Form Validation

8 Block After Multiple Attempts

9 Forgot Password Button

B. Search and Filters

1 Searching with One Character

2 Specific Search

3 Non-existing Product Search

4 Product Items Validation

5 Add to Cart Button Visibility

6 Sorting Options Check

7 Filters Validation

8 Main Search Page Control

9 Infinite Scroll

C. Product Details & Cart

1 Product List Details

2 Add To Cart

3 Book Information Validation

4 Price and Add To Cart Position

5 Add To Cart Notification

6 Cart Changes

D. Cart Control

1 Cart Access
 
2 Cart Item Information

3 Cart Total Price Verification

4 Quantity Increase & Price Check

5 Item Deletion

6 Clear Cart Button

7 Empty Cart Page Validation

8 Buy Button Check

9 Add to Cart Opens Cart

10 Random Product Add to Cart

E. Payment Checks

1 Open Payment Page (Address Step)

2 Open Payment Page (Payment Step)

3 Cargo Options Validation

4 Payment Methods Validation

5 Payment Information Form Validation

6 Payment Button Control

7 Payment Error Validation

8 Total Price Verification

- F. Guest Transactions

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