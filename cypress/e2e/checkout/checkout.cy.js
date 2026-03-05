describe('Checkout',()=>{
    beforeEach(()=>{
        cy.visit('/')
    })

    it('TC-CO-001 > Checkout end-to-end (Happy Path)',()=>{
        cy.login()

        cy.addToCartandCheckout(5)

        cy.get('@inventoryItems').then((item)=>{
            cy.get('.cart_item').each(($cartItem, index)=>{
                cy.wrap($cartItem).find('.inventory_item_name').should('have.text',item[index].nameProduct)
                cy.wrap($cartItem).find('.inventory_item_desc').should('have.text',item[index].description)
                cy.wrap($cartItem).find('.inventory_item_price').should('have.text',item[index].priceProduct)
            })
        })

        cy.get('[data-test="checkout"]').click()
        //isi form
        cy.get('[data-test="firstName"]').type('John')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('#postal-code').type('12345')
        cy.get('[data-test="continue"]').click()

        cy.get('@inventoryItems').then((item)=>{
            // const price = parseFloat(item[0].priceProduct.replace('$', ''))
            const subTotal = item.reduce((total, item)=>{
                return total +  parseFloat(item.priceProduct.replace('$',''))
            }, 0)
            const tax = (subTotal * 0.08).toFixed(2)
            const total = (subTotal + parseFloat(tax)).toFixed(2)

            cy.get('.cart_item').each(($coItem, index)=>{
                cy.wrap($coItem).find('.inventory_item_name').should('have.text',item[index].nameProduct)
                cy.wrap($coItem).find('.inventory_item_desc').should('have.text',item[index].description)
                cy.wrap($coItem).find('.inventory_item_price').should('have.text',item[index].priceProduct)
            })

            // cy.get('[data-test="subtotal-label"]').should('contain', subTotal.toFixed(2))
            cy.get('[data-test="subtotal-label"]').should('contain', subTotal.toFixed(2))
            cy.get('[data-test="tax-label"]').should('contain',tax)    
            cy.get('[data-test="total-label"]').should('contain',total)
        })

        cy.get('#finish').click()
        cy.contains('h2', 'Thank you for your order!').should('be.visible')
    })

    it('TC-CO-002 > Checkout Fail - First Name is Null',()=>{
        cy.login()

        cy.addToCartandCheckout(1)
        cy.get('[data-test="checkout"]').click()
        //isi form
        // cy.get('[data-test="firstName"]').type('John')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('#postal-code').type('12345')
        cy.get('[data-test="continue"]').click()

        cy.get('[data-test="firstName"]').should('have.css','border-bottom-color' , 'rgb(226, 35, 26)')
        cy.errorInput().should('be.visible').and('contain','First Name is required')
    })

    it('TC-CO-003 > Checkout Fail - Last Name is Null',()=>{
        cy.login()

        cy.addToCartandCheckout(1)

        cy.get('[data-test="checkout"]').click()

        //isi form
        cy.get('[data-test="firstName"]').type('John')
        // cy.get('[data-test="lastName"]').type('Doe')
        cy.get('#postal-code').type('12345')
        cy.get('[data-test="continue"]').click()

        cy.get('[data-test="lastName"]').should('have.css','border-bottom-color' , 'rgb(226, 35, 26)')
        cy.errorInput().should('be.visible').and('contain','Last Name is required')
    })

    it('TC-CO-004 > Checkout Fail - Postal Code is Null',()=>{
        cy.login()

        cy.addToCartandCheckout(1)
        
        cy.get('[data-test="checkout"]').click()

        //isi form
        cy.get('[data-test="firstName"]').type('John')
        cy.get('[data-test="lastName"]').type('Doe')
        // cy.get('#postal-code').type('12345')
        cy.get('[data-test="continue"]').click()

        cy.get('#postal-code').should('have.css','border-bottom-color' , 'rgb(226, 35, 26)')
        cy.errorInput().should('be.visible').and('contain','Postal Code is required')
    })

    it('TC-CO-005 > Validation calculation total price in order summary',()=>{
        cy.login()
        cy.addToCartandCheckout(3)

        cy.get('[data-test="checkout"]').click()

        //isi form
        cy.get('[data-test="firstName"]').type('John')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('#postal-code').type('12345')
        cy.get('[data-test="continue"]').click()

        cy.get('@inventoryItems').then((item)=>{
            // const price = parseFloat(item[0].priceProduct.replace('$', ''))
            const subTotal = item.reduce((total, item)=>{
                return total +  parseFloat(item.priceProduct.replace('$',''))
            }, 0)
            const tax = (subTotal * 0.08).toFixed(2)
            const total = (subTotal + parseFloat(tax)).toFixed(2)

            cy.get('.cart_item').each(($coItem, index)=>{
                cy.wrap($coItem).find('.inventory_item_name').should('have.text',item[index].nameProduct)
                cy.wrap($coItem).find('.inventory_item_desc').should('have.text',item[index].description)
                cy.wrap($coItem).find('.inventory_item_price').should('have.text',item[index].priceProduct)
            })

            // cy.get('[data-test="subtotal-label"]').should('contain', subTotal.toFixed(2))
            cy.get('[data-test="subtotal-label"]').should('contain', subTotal.toFixed(2))
            cy.get('[data-test="tax-label"]').should('contain',tax)    
            cy.get('[data-test="total-label"]').should('contain',total)
        })
    })

    it('TC-CO-006 > Cancel Order and back to cart',()=>{
        cy.login()

        cy.addToCartandCheckout(1)
        cy.get('[data-test="checkout"]').click()
        cy.get('#cancel').click()
        cy.url().should('include','/cart.html')
    })
})