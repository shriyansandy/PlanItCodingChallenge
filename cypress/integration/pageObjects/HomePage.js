class HomePage {

    getJupiterToysHeader() {
        return cy.get('.brand')
    }

    getContactTab() {
        return cy.get('a[href="#/contact"]')
    }

    getShopTab() {
       // return cy.get('a[href="#/shop"]')
        return cy.get('#nav-shop > a')
    }

    getCartTab() {
        return cy.get('a[href="#/cart"]')
    }
}
export default HomePage;