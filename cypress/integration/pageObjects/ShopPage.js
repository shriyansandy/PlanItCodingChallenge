class ShopPage {

    getJupiterToysHeader() {
        return cy.get('.brand')
    }

    getContactTab() {
        return cy.get('a[href="#/contact"]')
    }

    getShopTab() {
        return cy.get('a[href="#/shop"]')
    }

    clickOnProduct(productName, numberOfimes) {
        for (var i = 0; i < numberOfimes; i++) {
            cy.get('h4.product-title.ng-binding').each(($ele, index, $list) => {
                if ($ele.text().includes(productName)) {
                    cy.get('a.btn.btn-success').eq(index).click()
                }
            })
        }      
    }
}
export default ShopPage;

