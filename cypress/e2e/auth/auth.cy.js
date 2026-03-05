
describe('Authenticate', () => {
  beforeEach(()=>{
    cy.visit('/')
  })


  it('TC-1 Login with standard user',()=>{
    cy.login()
    cy.url().should('include','inventory.html')
  })

  it('TC-2 Login with locked user',()=>{
    cy.login('locked')
    cy.get('h3[data-test="error"]')
      .should('be.visible')
  })

  it('TC-3 Login with Problem user',()=>{
    cy.login('problem')
    cy.get('img[data-test="inventory-item-sauce-labs-bike-light-img"]').each(($img)=>{
      cy.wrap($img)
        .should('have.attr','src')
        .and('contain','sl-404')
    })
  })

  it('TC-4 Login with Performance/Glitch user',()=>{
    cy.login('performance')
    cy.url().should('include','inventory.html')
  })

  it('TC-5 Login with Error user',()=>{

    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Failed to remove item from cart')
      return false // mencegah Cypress fail otomatis
    })

    cy.login('error')
    cy.url().should('include','inventory.html')
    cy.get('#add-to-cart-sauce-labs-bike-light').click()
    cy.get('[data-test="shopping-cart-badge"]')
      .should('have.text','1')
    cy.get('#remove-sauce-labs-bike-light').click()
  })

  it('TC-6 Login with Visual user',()=>{
    cy.login('visual')
    cy.url().should('include','inventory.html')
  })

  it('TC-7 Login with empty ussername',()=>{
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]')
      .should('be.visible')
      .and('contain','Epic sadface: Username is required')
  })

  it('TC-8 Login with empty password',()=>{
    cy.get('#user-name').type('standard_user')
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]')
      .should('be.visible')
      .and('contain','Epic sadface: Password is required')
  })

  it('TC-9 Login with wrong password',()=>{
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secretSauce')
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]')
      .should('be.visible')
      .and('contain','Epic sadface: Username and password do not match any user in this service')
  })

  it('TC-10 Logout with standard user',()=>{
      cy.login()
      cy.url().should('include','inventory.html')
      cy.get('.bm-burger-button').click()
      cy.get('#logout_sidebar_link').click()
      cy.url().should('include','https://www.saucedemo.com/')
  })

  it('TC-SIMULATE > Verify login button text', () => {
    cy.visit('/')
    cy.get('#login-button').should('have.value', 'Sign In') // ❌ sengaja salah, aslinya 'Login'
  })

})