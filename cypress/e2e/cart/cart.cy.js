describe('Cart',()=>{
    beforeEach(()=>{
        cy.visit('/')
    })

    it('TC-CART-001 > Adding 1 cart from inventory',()=>{
        cy.login()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('have.text',1)
    })

    it('TC-CART-002 > Adding All item from inventory',()=>{
        cy.login()
        cy.get('.inventory_item').each(($price)=>{
            cy.wrap($price).find('button').click()
        })
        cy.get('[data-test="shopping-cart-badge"]').should('have.text','6')
    })

    it('TC-CART-003 > Adding All item from inventory',()=>{
        cy.login()
        cy.get('[data-test^="add-to-cart"]').then(($button)=>{
            cy.wrap($button.slice(0,3)).each(($btn)=>{
                cy.wrap($btn).click()
            })
        })

        cy.get('[data-test="shopping-cart-badge"]').should('have.text','3')
    })

    it('TC-CART-003-way-1 > Adding 2 item from inventory and remove 1 item from cart',()=>{
        cy.login()
        cy.get('[data-test^="add-to-cart"]').then(($button)=>{
            cy.wrap($button.slice(0,2)).each(($btn)=>{
                cy.wrap($btn).click()
            })
        })
        cy.get('[data-test="shopping-cart-badge"]').should('have.text','2')

        cy.get('[data-test^="remove"]').then(($button)=>{
            cy.wrap($button.slice(0,1)).each(($btn)=>{
                cy.wrap($btn).click()
            })
        })
        cy.get('[data-test="shopping-cart-badge"]').should('have.text','1')
    })

    it('TC-CART-003-way-2 > Adding 2 item from inventory and remove 1 item from cart',()=>{
        cy.login()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()

        cy.get('[data-test="shopping-cart-badge"]').should('have.text','2')

        cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text','1')
    })

    it('TC-CART-004-way-1 > Verify the contents of the cart according to the products added',()=>{
        cy.login()

        cy.get('[data-test="item-4-title-link"]')
        .invoke('text')
        .as("productName")

        cy.get('[data-test="inventory-item-desc"]')
        .eq(0)
        .invoke('text')
        .as("productDescription")

        cy.get('[data-test="inventory-item-price"]')
        .eq(0)
        .invoke('text')
        .as("productPrice")

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text','1')
        cy.get('[data-test="shopping-cart-link"').click()

        cy.get('@productName').then((proName)=>{
            cy.get('.cart_item .inventory_item_name').should('have.text',proName)
        })
        cy.get('@productDescription').then((proDescription)=>{
            cy.get('.cart_item .inventory_item_desc').should('have.text',proDescription)
        })
        cy.get('@productPrice').then((proPrice)=>{
            cy.get('.cart_item .inventory_item_price').should('have.text',proPrice)
        })
    })

    it('TC-CART-004-way-2 > Verify the contents of the cart according to the products added',()=>{
        cy.login()

        const inventoryItems = []

        cy.get('.inventory_item').each(($item, index)=>{
            if (index < 6){
                const nameProduct = $item.find('.inventory_item_name').text()
                const description = $item.find('.inventory_item_desc').text()
                const priceProduct  = $item.find('.inventory_item_price').text()

                inventoryItems.push({nameProduct,description,priceProduct})
                cy.wrap($item).find('button').click()
            }
        })

        cy.get('[data-test="shopping-cart-badge"]').should('have.text','6')
        cy.get('[data-test="shopping-cart-link"').click()

        cy.get('.cart_item').each(($cartItem, index)=>{
            cy.wrap($cartItem).find('.inventory_item_name').should('have.text',inventoryItems[index].nameProduct)
            cy.wrap($cartItem).find('.inventory_item_desc').should('have.text',inventoryItems[index].description)
            cy.wrap($cartItem).find('.inventory_item_price').should('have.text',inventoryItems[index].priceProduct)
        })
    })

    it('TC-CART-005 > Verification session persistence',()=>{
        cy.login()

        const inventoryItems = []

        cy.get('.inventory_item').each(($item, index)=>{
            if (index < 4){
                const nameProduct = $item.find('.inventory_item_name').text()
                const description = $item.find('.inventory_item_desc').text()
                const priceProduct  = $item.find('.inventory_item_price').text()

                inventoryItems.push({nameProduct,description,priceProduct})
                cy.wrap($item).find('button').click()
            }
        })

        cy.get('[data-test="shopping-cart-badge"]').should('have.text','4')
        cy.get('[data-test="shopping-cart-link"').click()

        cy.get('.cart_item').each(($cartItem, index)=>{
            cy.wrap($cartItem).find('.inventory_item_name').should('have.text',inventoryItems[index].nameProduct)
            cy.wrap($cartItem).find('.inventory_item_desc').should('have.text',inventoryItems[index].description)
            cy.wrap($cartItem).find('.inventory_item_price').should('have.text',inventoryItems[index].priceProduct)
        })

        cy.get('#continue-shopping').click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text','4')

    })
})