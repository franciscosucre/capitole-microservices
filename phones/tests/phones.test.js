const server = require('../app'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    should = chai.should(),
    Phone = require('../models/phones').model;
/* We setup chaiHttp */
chai.use(chaiHttp);

/* We define a pre made fixture to make testing easier */
const phoneData = [{
        'model': {
            name: "Maven 1",
            description: "The first Maven Model!!!",
            image_url: "http://phonesdata.com/es/smartphones/zte/maven-3331/",
            manufacturer: "ZTE"
        },
        'price': 500,
        'sold': false,
    },
    {
        'model': {
            name: "Maven 1",
            description: "The first Maven Model!!!",
            image_url: "http://phonesdata.com/es/smartphones/zte/maven-3331/",
            manufacturer: "ZTE"
        },
        'price': 500,
        'sold': true,
    },
]
/* We setup chaiHttp */
chai.use(chaiHttp);

/* We define our parent block */
describe('Phones', () => {

    /* We define our hooks */

    // runs before all tests in this block
    before(async function () {
        /* We delete all the phones */
        return await Phone.remove({});
    });

    // runs after all tests in this block
    after(async function () {
        /* We delete all the phones */
        return await Phone.remove({});
    });

    // runs before each test in this block
    beforeEach(async function () {
        /* We delete all the phones */
        return await Phone.remove({});
    });

    // runs after each test in this block
    afterEach(async function () {
        /* We delete all the phones */
        return await Phone.remove({});
    });

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
            await Phone.insertMany(phoneData);
            const res = await chai.request(server).get('/');
            expect(res).to.have.status(200);
            res.body.list.should.be.a('array');
            res.body.list.length.should.be.eql(2);
            res.body.count.should.be.a('number');
            res.body.count.should.be.eql(2);
        });

        it('it should GET all unsold phones', async function () {
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