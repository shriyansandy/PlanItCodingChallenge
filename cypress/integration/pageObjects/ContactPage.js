class ContactPage {

    getContactPageMessage() {
        return cy.get('.alert.alert-info.ng-scope')
    }

    getSubmitButton() {
        return cy.get('.btn-contact.btn.btn-primary')
    }

    getContactPageErrorMessage() {
        return cy.get('.alert.alert-error.ng-scope')
    }

    getForenameErrorMessage() {
        return cy.get('#forename-err')
    }

    getEmailErrorMessage() {
        return cy.get('#email-err')
    }

    getForenameField() {
        return cy.get('#forename')
    }

    getSurnameField() {
        return cy.get('#surname')
    }

    getEmailField() {
        return cy.get('#email')
    }

    getTelephoneField() {
        return cy.get('#telephone')
    }

    getMessageField() {
        return cy.get('#message')
    }

    getMessageError() {
        return cy.get('#message-err')
    }

    getSuccessMessage() {
        return cy.get('.alert.alert-success')
    }

    getBackButton() {
        return cy.get('a[class="btn"]')
    }
        
}
export default ContactPage;