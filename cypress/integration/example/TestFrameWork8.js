
/// <reference types='Cypress'/>
import HomePage from "../pageObjects/HomePage"
import ProductPage from "../pageObjects/ProductPage"
describe('My Eighth Test Suit', function(){
    before(function(){
        cy.fixture('example').then(function(data){
            this.data=data
        })
    })
    it('My Eighth Test Case', function(){
        const homePage=new HomePage()
        const productPage=new ProductPage()
        cy.visit('https://rahulshettyacademy.com/angularpractice')

        homePage.getEditBox().type(this.data.name)
        /*cy.get('input[name="name"]:nth-child(2)').type(this.data.name) */
        homePage.getGender().select(this.data.gender)
        /*cy.get('select').select(this.data.gender)*/
        homePage.getTwoWayDataBinding().should('have.value',this.data.name)
        homePage.getEditBox().should('have.attr','minlength','2')
        homePage.getEntrepreneaur().should('be.disabled')
/* cy.get('#inlineRadio3').should('be.disabled')*/
        /*cy.get(':nth-child(2) > .nav-link').click()*/ 
        homePage.getShopTab().click()

        Cypress.config('defaultCommandTimeout')

        this.data.productName.forEach(function(element){
            cy.selectProduct(element)
        })
        /*this .data.productName.forEach(function(element){*/
        productPage.checkOutButton().click()
        var sum=0

        cy.get('tr td:nth-child(4) strong').each(($e1,index,$list) =>{
            const amount=$e1.text()
            var res=amount.split(" ")
            res=res[1].trim()
            sum=Number(sum)+Number(res)

        }).then(function(){
            cy.log(sum)
        }) 
        cy.get('h3 strong').then(function(element)
        {
            const amount=element.text()
            var res=amount.split(" ")
            var total=res[1].trim()
            expect(Number(total)).to.equal(sum)

        })
        cy.contains('Checkout').click()
        cy.get('#country').type('Sweden')
        cy.wait(300)
        cy.get('.suggestions > ul > li > a').click()
        cy.get('.ng-untouched > .btn').click()
        cy.get('.alert').then(function(element){
            const actualText=element.text()
            expect(actualText.includes('Success')).to.be.true
        })
    })
})
        