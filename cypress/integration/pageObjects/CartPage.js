class CartPage {

    getCartMessage() {
        return cy.get('.cart-msg')
    }

    getTotal() {
        return cy.get('.total.ng-binding')
    }

    verifyProductPrice(productName, expectedProductPrice) { 
        cy.get('tr td:nth-child(1)').each(($ele, index, $list) => {
            if ($ele.text().includes(productName)) {
                cy.get('tr td:nth-child(1)').eq(index).next().then(function (price){
                    const productPrice  = price.text()
                    expect(productPrice).equal(expectedProductPrice)
                })
            }
        })
    }

    checkProductSubtotal(productName, productPrice, productQuantity) {
        var productSubTotal = ""
        var requiredProductPrice = productPrice.substring(1)
        var SubTotalOfEachProduct = productQuantity * Number(requiredProductPrice)
        var expectedSubTotal = "" + SubTotalOfEachProduct
        cy.get('td.ng-binding').each(($ele, index, $list) => {
            if ($ele.text().includes(productName)) {
                cy.get('td.ng-binding').eq(index+2).then(function (subtotal) {
                    productSubTotal = subtotal.text()
                    productSubTotal = productSubTotal.substring(1)
                    expect(productSubTotal).equal(expectedSubTotal)
                })
            }
        })
    }

    checkProductNameInTheCart(productName) {
        cy.get('table').contains('td', productName).should('be.visible');
    }

    verifyTotal() {
        var sumOfSubTotals = 0
        var actualsubTotal = 0
        cy.get('tr td:nth-child(4)').each(($ele, index, $list) => {
            var subtotal = $ele.text().substring(1)
            sumOfSubTotals = Number(sumOfSubTotals) + Number(subtotal)
        })
        cy.get('.total.ng-binding').then(function (total) {
            const actualTotal = total.text()
            var res = actualTotal.split(":", 2)
            actualsubTotal = Number(res[1].trimLeft())
        })
        expect(actualsubTotal).to.eq(sumOfSubTotals)
    }
}
export default CartPage;