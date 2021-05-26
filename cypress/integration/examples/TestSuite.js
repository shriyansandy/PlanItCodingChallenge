/// <reference types="Cypress" />

import HomePage from '../pageObjects/HomePage'
import ContactPage from '../pageObjects/ContactPage'
import ShopPage from '../pageObjects/ShopPage'
import CartPage from '../pageObjects/CartPage'


describe('Automated Test Suite For JupiterCloud', function () {
    const homePage = new HomePage()
    const contactPage = new ContactPage()
    const shopPage = new ShopPage()
    const cartPage = new CartPage()

    /*before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
        })
    })*/

    this.beforeEach(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
        })
        cy.log('Navigate to the home page of Jupiter Cloud.')
        cy.launchApplication("https://jupiter.cloud.planittesting.com/")
        homePage.getJupiterToysHeader().should('have.contain.text', 'Jupiter Toys')
    })
        
    

    it('Validate the Form.', function () {
        cy.log('From the Home Page goto ContactPage.')
        homePage.getContactTab().click()
        contactPage.getContactPageMessage().should('have.contain.text', this.testdata.welcomemessage)
        cy.log('Click Submit button.')
        contactPage.getSubmitButton().click()
        cy.log('Validate Errors.')
        contactPage.getContactPageErrorMessage().should('have.contain.text', this.testdata.incompleteformmessage)
        contactPage.getForenameErrorMessage().should('have.contain.text', this.testdata.fornamerequiredmessage)
        contactPage.getEmailErrorMessage().should('have.contain.text', this.testdata.emailrequiredmessage)
        contactPage.getMessageError().should('have.contain.text', this.testdata.messagerequired)
        cy.log('Populate Mandatory Fields.')
        contactPage.getForenameField().type(this.testdata.name)
        contactPage.getSurnameField().type(this.testdata.surname)
        contactPage.getEmailField().type(this.testdata.email)
        contactPage.getTelephoneField().type(this.testdata.phonenumber)
        contactPage.getMessageField().type(this.testdata.testmessage)
        cy.log('Validate errors are gone.')
        contactPage.getContactPageErrorMessage().should('not.exist');
        contactPage.getForenameErrorMessage().should('not.exist');
        contactPage.getEmailErrorMessage().should('not.exist');
        contactPage.getMessageError().should('not.exist');
    })

   /* Cypress._.times(5, () => {
        it.only("successfully submits the form", () => {
            cy.log('From the Home Page goto ContactPage.')
            homePage.getContactTab().click()
            contactPage.getContactPageMessage().should('have.contain.text', this.testdata.welcomemessage)
            cy.log('Click Submit button.')
            contactPage.getSubmitButton().click()
            cy.log('Validate Errors.')
            contactPage.getContactPageErrorMessage().should('have.contain.text', this.testdata.incompleteformmessage)
            contactPage.getForenameErrorMessage().should('have.contain.text', this.testdata.fornamerequiredmessage)
            contactPage.getEmailErrorMessage().should('have.contain.text', this.testdata.emailrequiredmessage)
            contactPage.getMessageError().should('have.contain.text', this.testdata.messagerequired)
            cy.log('Populate Mandatory Fields.')
            contactPage.getForenameField().type(this.testdata.name)
            contactPage.getSurnameField().type(this.testdata.surname)
            contactPage.getEmailField().type(this.testdata.email)
            contactPage.getTelephoneField().type(this.testdata.phonenumber)
            contactPage.getMessageField().type(this.testdata.testmessage)
            contactPage.getSubmitButton().click()
            cy.log('Validate errors are gone.')
            contactPage.getSuccessMessage().should('have.contain.text', this.testdata.appreciatefeedbackmessage)
        });
    });*/

    it('Submit Form multiple times.', function () {
        for (var i = 0; i < 5; i++) {
            cy.log('From the Home Page goto Contact Page.')
            homePage.getContactTab().click()
            contactPage.getContactPageMessage().should('have.contain.text', this.testdata.welcomemessage)
            cy.log('Populate Mandatory Fields.')
            contactPage.getForenameField().type(this.testdata.name, { waitForAnimations: false })
            contactPage.getSurnameField().type(this.testdata.surname)
            contactPage.getEmailField().type(this.testdata.email)
            contactPage.getTelephoneField().type(this.testdata.phonenumber)
            contactPage.getMessageField().type(this.testdata.testmessage)
            cy.log('Click Submit button.')
            contactPage.getSubmitButton().click()
            cy.log('Validate successful Submission Messsage.')
            contactPage.getSuccessMessage().should('have.contain.text', this.testdata.appreciatefeedbackmessage)
            contactPage.getBackButton().click()
        }
            
    })

    it('Verify items are in the cart', function () {
        cy.log('From the Home Page goto Shop Page.')
        homePage.getShopTab().click()
        cy.log("Click Buy button 2 times on 'Funny Cow'.")
        shopPage.clickOnProduct("Funny Cow", 2)
        cy.log("Click Buy button 1 time on 'Fluffy Bunny'.")
        shopPage.clickOnProduct("Fluffy Bunny", 1)
        cy.log("Click the cart Menu.")
        homePage.getCartTab().click()
        cy.log("Verify the items are in the Cart menu.")
        cartPage.getCartMessage().should('have.contain.text', this.testdata.threeitemsinthecartmessage)
        cartPage.checkProductNameInTheCart("Funny Cow")
        cartPage.checkProductNameInTheCart("Fluffy Bunny")
        
    })

    it('Verify the Total Amount', function () {
        cy.log('From the Home Page goto Shop Page.')
        homePage.getShopTab().click()
        cy.log("Click Buy button 2 times on 'Stuffed Frog'.")
            shopPage.clickOnProduct("Stuffed Frog", 2)
        cy.log("Click Buy button 5 time on 'Fluffy Bunny'.")
            shopPage.clickOnProduct("Fluffy Bunny", 5)
        cy.log("Click Buy button 3 time on 'Fluffy Bunny'.")
            shopPage.clickOnProduct("Valentine Bear", 3)
        cy.log("Click the cart Menu.")
        homePage.getCartTab().click()
        cartPage.checkProductNameInTheCart("Stuffed Frog")
        cartPage.checkProductNameInTheCart("Fluffy Bunny")
        cartPage.checkProductNameInTheCart("Valentine Bear")
        cy.log("Verify the price of the each product.")
        cartPage.verifyProductPrice("Stuffed Frog", this.testdata.stuffedfrogprice)
        cartPage.verifyProductPrice("Fluffy Bunny", this.testdata.fluffybunnyprice)
        cartPage.verifyProductPrice("Valentine Bear", this.testdata.valentinebearprice)
        cy.log('Verify each products subtotal = product price * quantity')
        cartPage.checkProductSubtotal("Stuffed Frog", this.testdata.stuffedfrogprice, 2)
        cartPage.checkProductSubtotal("Fluffy Bunny", this.testdata.fluffybunnyprice, 5)
        cartPage.checkProductSubtotal("Valentine Bear", this.testdata.valentinebearprice, 3)
        cy.log('Verify the Total = sum(sub Totals).')
        cartPage.verifyTotal()
    })
})