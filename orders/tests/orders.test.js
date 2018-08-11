const path = require('path');
const axios = require('axios');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const phoneServer = "http://phones:3001";
const expect = require('chai').expect;
var should = require("chai").should();
const Order = require('../models/orders').model;

chai.use(chaiHttp);

/**
 * Module dependencies.
 */

var app = require('../app');
var http = require('http');

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3002);


//Our parent block
describe('Orders', () => {

    before(async function () {
        try {
            return await Order.remove({});
        } catch (error) {
            console.log(error)
        }

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

    /*
     * Test the /POST route
     */
    describe('/POST orders', () => {
        it('it should POST 0 orders', async function () {
            const phoneData = [{
                    'model': {
                        name: "Maven 1",
                        description: "The first Maven Model!!!",
                        image_url: "sdfsdf",
                        manufacturer: "ZTE"
                    },
                    'price': 500,
                    'sold': false,
                },
                {
                    'model': {
                        name: "Maven 1",
                        description: "The first Maven Model!!!",
                        image_url: "sdfsdf",
                        manufacturer: "ZTE"
                    },
                    'price': 500,
                    'sold': true,
                },
            ]
            const phone_ids = [];
            const promises = [];

            for (let i = 0; i < phoneData.length; i++) {
                const element = phoneData[i];
                promises.push(chai.request("http://phones:3001").post('/')
                    .send(element));
                
            }

            const responses = await Promise.all(promises);
            for (let i = 0; i < responses.length; i++) {
                const response = responses[i];
                phone_ids.push(response.body.object._id);
            }

            const res = await chai.request(server).post('/')
                .send({
                    name: 'Francisco',
                    surname: 'Sucre',
                    email: 'frank91frank@gmail.com',
                    phones: [
                        phone_ids[0]._id
                    ]
                });
            expect(res).to.have.status(200);
            res.body.list.should.be.a('array');
            res.body.list.length.should.be.eql(0);
            res.body.count.should.be.a('number');
            res.body.count.should.be.eql(0);
        });

    });
});