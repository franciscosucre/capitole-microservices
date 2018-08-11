//Require the dev-dependencies
const server = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should = require("chai").should();
const Order = require('../models/orders').model;

chai.use(chaiHttp);



//Our parent block
describe('Orders', () => {

    before(async function () {
        return await Order.remove({});
    });

    after(async function () {
        // runs after all tests in this block
        return await Order.remove({});
    });

    beforeEach(async function () {
        // runs before each test in this block
        return await Order.remove({});
    });

    afterEach(async function () {
        // runs after each test in this block
        return await Order.remove({});
    });

    /*
     * Test the /GET route
     */
    describe('/GET orders', () => {
        it('it should GET 0 orders', async function () {
            const res = await chai.request(server).get('/');
            expect(res).to.have.status(200);
            res.body.list.should.be.a('array');
            res.body.list.length.should.be.eql(0);
            res.body.count.should.be.a('number');
            res.body.count.should.be.eql(0);
        });

    });

});