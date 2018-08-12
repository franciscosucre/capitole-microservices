# Capitole Phone Microservices

This repository holds a Backend Code Challenge for Capitole Consulting. It is implemented using NodeJS. It is implemented using a microservice arquitecture. 

It implementes a phone selling platform. 

It is divided in the following microservices:

1. **database:** A microservice that hosts a MongoDB server with all the differente databases used in all the other services.
2. **phones:** A microservice that hosts an REST API implemented with ExpressJS 4 with all the endpoints with logic relative to phones. Some of the functionality of this microservices are creating phones, marking a group of phones as sold and obtaining the current phone catalog. For scabililty (following the microservice arquitecture) , it uses it's own database hosted in the database service.
3. **orders:** A microservice that hosts an REST API implemented with ExpressJS 4 with all the endpoints with logic relative to orders. Some of the functionality of this microservices are creating orders and list orders. For scabililty (following the microservice arquitecture) , it uses it's own database hosted in the database service. It communicates with the phone service through HTTP requests.

**Language:** Javascript (NodeJS 8.11.3 LTS)

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

# Additional Code Challenge Questions

**- How would you improve the system?**

1. Implement an authentication system with user permissions. This would allow the owner of the product to protect confidential information. This could be implemented on a new micro service.
2. Implement request body validation. This would allows us to reject invalid requests as soon as posible.
3. Implement automatic database backup.
4. Implement a logging system that would allow us to log the events of the app to the console and to log files.
5. Implement automatic tasks to clean up the database and other type of tasks. One example could be a task that takes phones that are already sold a while ago, and store them in a different database. 


**- How would you avoid your order API to be overflow?**

1. Run each of the microservices using a process manager (like pm2) that allows us to run our microservices in cluster mode.
2. Use load balancers.
3. Use Master-Slave replication on our database server in order to distribute more effectively read-only requests like obtaining the phone catalog.
