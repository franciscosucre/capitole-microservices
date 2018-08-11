const path = require('path');



//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../app');
const Phone = require('../models/phones').model;
const expect = require('chai').expect;


chai.use(chaiHttp);

//Our parent block
describe('Phones', () => {

    before(async function () {
        try {
            return await Phone.remove({});
        } catch (error) {
            console.log(error)
        }

    });

    after(async function () {
        // runs after all tests in this block
        return await Phone.remove({});
    });

    beforeEach(async function () {
        // runs before each test in this block
        return await Phone.remove({});
    });

    afterEach(async function () {
        // runs after each test in this block
        return await Phone.remove({});
    });

    /*
     * Test the /GET route
     */
    describe('/GET phones', () => {
        it('it should GET 0 phones', async function () {
            const res = await chai.request(server).get('/');
            expect(res).to.have.status(200);
            res.should.have.status(200);
            res.body.list.should.be.a('array');
            res.body.list.length.should.be.eql(0);
            res.body.count.should.be.a('number');
            res.body.count.should.be.eql(0);
        });

        it('it should GET all phones', async function () {
            const phoneData = [{
                'model': {
                    name: "Maven 1",
                    description: "The first Maven Model!!!",
                    image_url: "",
                    manufacturer:"ZTE"
                },
                'price': 500,
                'sold': false,
            },
            {
                'model': {
                    name: "Maven 1",
                    description: "The first Maven Model!!!",
                    image_url: "",
                    manufacturer:"ZTE"
                },
                'price': 500,
                'sold': true,
            }, ]
            await Phone.insertMany(phoneData);


            const res = await chai.request(server).get('/');
            expect(res).to.have.status(200);
            res.should.have.status(200);
            res.body.list.should.be.a('array');
            res.body.list.length.should.be.eql(2);
            res.body.count.should.be.a('number');
            res.body.count.should.be.eql(2);
        });

        it('it should GET all unsold phones', async function () {
            const phoneData = [{
                'model': {
                    name: "Maven 1",
                    description: "The first Maven Model!!!",
                    image_url: "",
                    manufacturer:"ZTE"
                },
                'price': 500,
                'sold': false,
            },
            {
                'model': {
                    name: "Maven 1",
                    description: "The first Maven Model!!!",
                    image_url: "",
                    manufacturer:"ZTE"
                },
                'price': 500,
                'sold': true,
            }, ]
            await Phone.insertMany(phoneData);
            const res = await chai.request(server).get('/?sold=false');
            expect(res).to.have.status(200);
            res.should.have.status(200);
            res.body.list.should.be.a('array');
            res.body.list.length.should.be.eql(1);
            res.body.count.should.be.a('number');
            res.body.count.should.be.eql(1);
        });

    });
});