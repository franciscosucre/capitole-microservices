# Capitole Phone Microservices

This repository holds a Backend Code Challenge for Capitole Consulting. It is implemented using NodeJS. 

**Framework:** ExpressJS

**Database:** MongoDB

**Test Framework:** Mocha + Chai


# Prequisites

- Docker
- Docker Composer

# How to run it

`docker-compose up --force-recreate --build --remove-orphans`

# How to test it

`docker-compose -f docker-compose.test.yml up --build`

# Phone Endpoints

**Get Phone Catalog (/ GET)**

Obtains the phone catalog. Can receive filters.

Example request: 

URL: /?sold=false

`
{
    "list": [{
                "model": {
                    "name": "Maven 1",
                    "description": "The first Maven Model!!!",
                    "image_url": "sdfsdf",
                    "manufacturer": "ZTE"
                },
                "sold": false,
                "_id": "5b6ef9e9ba4488a0534e2bcc",
                "price": 500
            }],
    "count": 1
}
`


# Order Endpoints

**Create Order (/ POST)**

Creates a purchase order for a given client and a list of phone ids. It uses the phone catalog service to verify if the phones are available.

Example request:

`{
	"name": "Francisco",
    "surname": "Sucre",
    "email": "frank91frank@gmail.com",
    "phones": [
        "5b6ef9e9ba4488a0534e2bcc"
    ]
}`

Example response:

`{
    "object": {
        "client": {
            "name": "Francisco",
            "surname": "Sucre",
            "email": "frank91frank@gmail.com"
        },
        "_id": "5b6f0707aa153ef45080e15f",
        "phones": [
            {
                "model": {
                    "name": "Maven 1",
                    "description": "The first Maven Model!!!",
                    "image_url": "sdfsdf",
                    "manufacturer": "ZTE"
                },
                "sold": false,
                "_id": "5b6ef9e9ba4488a0534e2bcc",
                "price": 500
            }
        ],
        "total": 500,
        "__v": 0
    }
}`