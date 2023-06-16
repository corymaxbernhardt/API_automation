const { expect } = require("chai");
const utilities = require("./utilities.js");
const apiData = require("./apiData.js");

const methodTypes = {
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
    delete: 'DELETE',
    options: 'OPTIONS'
}
const availableBooks = []

const nonAvailableBooks = []


describe('myApiSimpleBookSuite', function () {
    describe('grabAuthentication', function () {
        it('should return an access token', async function () {
            const authenticationResponse = await utilities.makeRequest(
                apiData.endpoints.authentication,
                201,
                apiData.body.authentication, 
                 methodTypes.post)
            expect(authenticationResponse.body).to.have.own.property("accessToken")
            utilities.setAccessToken(authenticationResponse.body.accessToken)
        });
        it('should get a list of books', async function () {
            const getlistOfBooks = await utilities.makeRequest(
                apiData.endpoints.listOfBooks, 
                200,
                methodTypes.get);
                getlistOfBooks.body.forEach(book => {
                    //condition ? resolution1 : or resolution2
                    book.available ?  availableBooks.push(book) : nonAvailableBooks.push(book)
                });
                console.log('available books', availableBooks)
                console.log('nonavailable books', nonAvailableBooks)
        });
        it.skip('should get a list of fiction books', async function () {
            const getlistOfFictionBooks = await utilities.getFiction(
                apiData.endpoints.listOfBooks,
                apiData.endpoints.listOfBooks, 201)
            console.log(getlistOfFictionBooks.body);
        });
        it('order an available book', async function () {
            const randomIndex = Math.floor(Math.random() * availableBooks.length)
            const createBookOrder = await utilities.postsubmitBookOrder(
                apiData.endpoints.order,
                apiData.endpoints.order, 201, availableBooks[randomIndex].id)
            console.log(createBookOrder.body);
        });
        it('should fail to order a non-available book', async function () {
            const errorString = 'This book is not in stock. Try again later.'
            const randomIndex = Math.floor(Math.random() * nonAvailableBooks.length)
            const createBookOrder = await utilities.postsubmitBookOrder(
                apiData.endpoints.order,
                apiData.endpoints.order, 404, nonAvailableBooks[randomIndex].id)
            expect(createBookOrder.body.error).to.be.equal(errorString)
        });
        it.skip('Get all orders', async function () {
            const getAllOrder = await utilities.getAllOrders(
                apiData.endpoints.order,
                apiData.endpoints.order, 201)
            console.log(getAllOrder.body);
            const orders = getAllOrder.body;
            const customerNames = orders.map(order => order.customerName);
            console.log(customerNames);
        });
        it.skip('Update customers name on order', async function () {
            const updateOrder = await utilities.updateCustomerName(
                apiData.endpoints.editOrderPage,
                apiData.endpoints.editOrderPage, 201)
            console.log(updateOrder.body);
            console.dir(apiData.endpoints.editOrderPage);
        });
    });
});
