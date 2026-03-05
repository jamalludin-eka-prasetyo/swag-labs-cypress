describe('Inventory',()=>{
    beforeEach(()=>{
        cy.visit('/')
    })

    it('TC-INV-001 > Showing Six Product in Inventory with user standard',()=>{
        cy.login()
        cy.get('.inventory_item')
        .should('have.length',6)

        cy.get('img.inventory_item_img').each(($img)=>{
            cy.wrap($img)
            .should('be.visible')
        })
    })

    it('TC-INV-002 > Sorting Name to A-Z',()=>{
        cy.login()
        cy.get('[data-test="product-sort-container"]')
        .select('az')

        cy.get('[data-test="product-sort-container"]')
        .should('have.value','az')

        cy.get('.inventory_item_name')
        .eq(0)
        .should('have.text','Sauce Labs Backpack')
    })

    it('TC-INV-003 > Sorting Name to Z-A',()=>{
        cy.login()
        cy.get('[data-test="product-sort-container"]')
        .select('za')

        cy.get('[data-test="product-sort-container"]')
        .should('have.value','za')

        cy.get('.inventory_item_name')
        .eq(0)
        .should('have.text','Test.allTheThings() T-Shirt (Red)')
    })

    it('TC-INV-004 > Sorting Price (low to high)',()=>{
        cy.login()
        cy.get('[data-test="product-sort-container"]')
        .select('lohi')

        cy.get('[data-test="product-sort-container"]')
        .should('have.value','lohi')

        cy.get('.inventory_item_price')
        .eq(0)
        .should('have.text','$7.99')
    })

    it('TC-INV-005 > Sorting Price (high to low)',()=>{
        cy.login()
        cy.get('[data-test="product-sort-container"]')
        .select('hilo')

        cy.get('[data-test="product-sort-container"]')
        .should('have.value','hilo')

        cy.get('.inventory_item_price')
        .eq(0)
        .should('have.text','$49.99')
    })

    it('TC-INV-006 > Verification Image on user Problem is default',()=>{
        cy.login('problem')
        cy.get('.inventory_item_img img').each(($img)=>{
            cy.wrap($img)
                .should('have.attr','src')
                .and('contain','sl-404')
        })

    })

    it('TC-INV-007 > Description each card inventory',()=>{
        cy.login()
        cy.get('.inventory_item_description').each(($card)=>{
            cy.wrap($card).should('be.visible')
            // validasi ada class .inventory_item_name
            cy.wrap($card).find('.inventory_item_name').should('be.visible')
            // validasi ada class .inventory_item_desc
            cy.wrap($card).find('.inventory_item_desc').should('be.visible')
            // validasi ada class .inventory_item_price
            cy.wrap($card).find('.inventory_item_price').should('be.visible')
        })
    })
    
})