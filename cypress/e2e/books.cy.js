import { user } from "../support/factories/user"
import { books, book } from "../support/schema"

const Ajv = require("ajv")
const ajv = new Ajv({ allErrors: true, verbose: true })
const bookValidation = require('../fixtures/mock-book.json')

describe('/BookStore', () => {

    before(() => {
        cy.createUser(user)
    })

    context('GET - /Books', () => {

        beforeEach(() => {
            cy.api('GET', '/BookStore/v1/Books').as('books')
        })

        it('validate header info', () => {
            cy.get('@books')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json; charset=utf-8')
        })

        it('validade status code', () => {
            cy.get('@books')
                .its('status')
                .should('equal', 200)
        })

        it('validate structre', () => {
            const validate = ajv.compile(books)
            cy.get('@books').then(response => {
                const v = validate(response.body)
                if (!v) 
                {
                    cy.log(v.errors).then(() => {
                        throw new Error('Falha de contrato.')
                    })
                } else 
                {
                    cy.log('Sucesso na validação da estrutra!')
                }
            })
        })

    })


    context('GET - /book/9781593277574', () => {

        const isbn = '9781593277574'

        beforeEach(() => {
            cy.api({
                method: 'GET',
                url: '/BookStore/v1/Book',
                qs: { ISBN: isbn }
            }).as('book')
        })

        it('validate header info', () => {
            cy.get('@book')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json; charset=utf-8')
        })

        
        it('validade status code', () => {
            cy.get('@book')
                .its('status')
                .should('equal', 200)
        })

        it('validate structre', () => {
            const validate = ajv.compile(book)
            cy.get('@book').then(response => {
                const v = validate(response.body)
                if (!v) 
                {
                    cy.log(v.errors).then(() => {
                        console.log(v.errors)
                        throw new Error('Falha de contrato.')
                    })
                } else 
                {
                    cy.log('Sucesso na validação da estrutra!')
                }
            })
        })

        it('validate title of the book', () => {
            cy.get('@book').then(response => {
                expect(response.body.isbn).to.eq(bookValidation.isbn)
                expect(response.body.title).to.eq(bookValidation.title)
                expect(response.body.subTitle).to.eq(bookValidation.subTitle)
                expect(response.body.author).to.eq(bookValidation.author)
                expect(response.body.publish_date).to.eq(bookValidation.publish_date)
                expect(response.body.publisher).to.eq(bookValidation.publisher)
                expect(response.body.pages).to.eq(bookValidation.pages)
                expect(response.body.description).to.eq(bookValidation.description)
                expect(response.body.website).to.eq(bookValidation.website)
            })
        })

    })

    context('GET - /book/9781593277573', () => {

        const isbn = '9781593277573'

        beforeEach(() => {
            cy.api({
                method: 'GET',
                url: '/BookStore/v1/Book',
                qs: { ISBN: isbn },
                failOnStatusCode: false
            }).as('book')
        })

        it('validate header info', () => {
            cy.get('@book')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json; charset=utf-8')
        })

        
        it('validade status code', () => {
            cy.get('@book')
                .its('status')
                .should('equal', 400)
        })

        it('validate error message - 1205', () => {
            cy.get('@book').then(response => {
                console.log(response)
                expect(response.body.code).to.eq('1205')
                expect(response.body.message).to.eq('ISBN supplied is not available in Books Collection!')
            })
        })

    })


    after(() => {
        cy.authorized(user)
        cy.deleteUser()
    })

})