const path = require('path');

let Phone = require(path.resolve(process.cwd(), 'models/phones')).model;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require(path.resolve(process.cwd(), 'app.js'));


chai.use(chaiHttp);

//Our parent block
describe('Phones', () => {

    before(async function () {
        // runs before all tests in this block
        await Phone.remove({});
    });

    after(async function () {
        // runs after all tests in this block
        await Phone.remove({});
    });

    beforeEach(async function () {
        // runs before each test in this block
        await Phone.remove({});
    });

    afterEach(async function () {
        // runs after each test in this block
        await Phone.remove({});
    });

    /*
     * Test the /GET route
     */
    describe('/GET user', () => {
        it('it should GET all the users', async function () {
            const res = await chai.request(server).get('/phones/');
            res.should.have.status(200);
            res.body.list.should.be.a('array');
            res.body.list.length.should.be.eql(0);
            res.body.count.should.be.a('number');
            res.body.count.should.be.eql(0);
        });
    });
});
