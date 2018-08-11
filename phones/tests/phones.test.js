const path = require('path');



//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = "localhost:3001"

chai.use(chaiHttp);

//Our parent block
describe('Phones', () => {
    /*
     * Test the /GET route
     */
    describe('/GET phones', () => {
        it('it should GET 0 phones', async function () {
            const res = await chai.request(server).get('/');
            expect(res).to.have.status(200);
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
                    image_url: "sdfsdf",
                    manufacturer:"ZTE"
                },
                'price': 500,
                'sold': false,
            },
            {
                'model': {
                    name: "Maven 1",
                    description: "The first Maven Model!!!",
                    image_url: "sdfsdf",
                    manufacturer:"ZTE"
                },
                'price': 500,
                'sold': true,
            }, ]
            await Phone.insertMany(phoneData);


            const res = await chai.request(server).get('/');
            expect(res).to.have.status(200);
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
                    image_url: "sdfsdf",
                    manufacturer:"ZTE"
                },
                'price': 500,
                'sold': false,
            },
            {
                'model': {
                    name: "Maven 1",
                    description: "The first Maven Model!!!",
                    image_url: "sdfsdf",
                    manufacturer:"ZTE"
                },
                'price': 500,
                'sold': true,
            }, ]
            await Phone.insertMany(phoneData);
            const res = await chai.request(server).get('/?sold=false');
            expect(res).to.have.status(200);
            res.body.list.should.be.a('array');
            res.body.list.length.should.be.eql(1);
            res.body.count.should.be.a('number');
            res.body.count.should.be.eql(1);
        });

    });
});