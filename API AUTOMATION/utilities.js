const { spec, request } = require('pactum');

let accessToken = '';

request.setBaseUrl('https://simple-books-api.glitch.me');

function setAccessToken(token) {
    accessToken = token
    console.log('Access token was set', accessToken);
}

function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2,8)
    const randomDomain = Math.random().toString(36).substring(2,8)
    return `${randomString}@${randomDomain}.com`;
}

function generateRandomUserName() {

    return `Naruto${Math.floor(Math.random() * 34)}`;
}

function generateRandomOrderName() {

    return `Sasuke${Math.floor(Math.random() * 1434)}`;
}
function generateRandomOrderNumber() {

    return Math.floor(Math.random() * 1483312334);
}

async function post(path, body, status) {

    const response = await spec()
        .post(path)
        .withJson(body)
        .expectStatus(status);
    return response;
}
async function get(path, status) {

    const response = await spec()
        .get(path)
        .expectStatus(status);
    return response;
}

async function makeRequest(path, status, body='', method) {

    const response = await spec()
        .withMethod(method)
        .withPath(path)
        .withBody(body)
        .inspect()
        .expectStatus(status);
    return response;
}

async function getFiction(path, type, limit, status) {

    const response = await spec()
        .get(path)
        .withQueryParams({ type, limit })
        .expectStatus(status);
    return response;
}

async function postsubmitBookOrder(path, body, status, bookId) {
    const response = await spec()
        .withHeaders('Authorization', `Bearer ${accessToken}`)
        .post(path)
        .withJson({ 'bookId': bookId, 'customerName': generateRandomOrderName() })
        .inspect()
        .expectStatus(status)
        .toss();
    return response;
}

async function getAllOrders(type, limit) {
    const response = await spec()
        .withHeaders('Authorization', `Bearer ${accessToken}`)
        .get('/orders')
    return response;
}

async function updateCustomerName() {
    const orderID = 'gwX7_b9PX_nYPawbPUCol';
    const response = await spec()
        .withHeaders('Authorization', `Bearer ${accessToken}`)
        .patch('/orders/${orderID}')
        .withJson({ customerName: 'RockLee', id: 'orderId' })
        .toss();

    return response.body;
}

async function listOfAvailableBooks() {
    const response = await spec()
        

    return response.body;
}

module.exports = {
    generateRandomEmail,
    generateRandomUserName,
    generateRandomOrderName,
    post,
    get,
    getFiction,
    postsubmitBookOrder,
    getAllOrders,
    updateCustomerName,
    setAccessToken,
    makeRequest


}
