// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login',(userType = 'standard')=>{
    cy.fixture('users/user').then((us)=>{
        const user = us[userType]
        cy.get('#user-name').type(user.username)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
    })
})

Cypress.Commands.add('addToCartandCheckout', (itemCount = 1)=>{
    const inventoryItems = []

        cy.get('.inventory_item').each(($item, index)=>{
            if (index < itemCount){
                const nameProduct = $item.find('.inventory_item_name').text()
                const description = $item.find('.inventory_item_desc').text()
                const priceProduct  = $item.find('.inventory_item_price').text()

                inventoryItems.push({nameProduct,description,priceProduct})
                cy.wrap($item).find('button').click()
            }
        })

        cy.get('[data-test="shopping-cart-badge"]').should('have.text',String(itemCount))
        cy.get('[data-test="shopping-cart-link"').click()

        // cy.get('.cart_item').each(($cartItem, index)=>{
        //     cy.wrap($cartItem).find('.inventory_item_name').should('have.text',inventoryItems[index].nameProduct)
        //     cy.wrap($cartItem).find('.inventory_item_desc').should('have.text',inventoryItems[index].description)
        //     cy.wrap($cartItem).find('.inventory_item_price').should('have.text',inventoryItems[index].priceProduct)
        // })

        cy.then(() => {
            cy.wrap(inventoryItems).as('inventoryItems')
        })

        // cy.get('[data-test="checkout"]').click()
})

Cypress.Commands.add('errorInput',()=>{
    cy.get('[data-test^="error"]')
})