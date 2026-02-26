import './commands'

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('window.google_trackConversion is not a function')) {
    return false;
  }
  
});

