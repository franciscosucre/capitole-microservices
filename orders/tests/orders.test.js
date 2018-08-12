const server = require('../app'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    should = chai.should(),
    Order = require('../models/orders').model;
/* We setup chaiHttp */
chai.use(chaiHttp);



/* We define our parent block */
describe('Orders', () => {

    /* We define our hooks */

    before(async function () {
        // runs before all tests in this block
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