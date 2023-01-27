import image1 from "../apartmentInterior/image1.png"

const myListings = [
    {
        "id": 1,
        "title": "Appartment for rent.",
        "description": "SRID 4326 - longitude and latitude\r\nEvery geometric shape has a spatial reference system associated with it, and each such reference system has a Spatial Reference System ID (SRID). The SRID is used to tell which spatial reference system will be used to interpret each spatial object.",
        "area": "Brooklyn",
        "listing_type": "House",
        "property_status": "Rent",
        "price": "2500",
        "rental_frequency": "Month",
        "rooms": 3,
        "furnished": false,
        "pool": true,
        "elevator": false,
        "parking": true,
        "date_posted": "2023-01-24T03:54:26Z",
        "location": {
            "type": "Point",
            "coordinates": [
                40.6945,
                -73.98483
            ],
        },
        picture1: image1,
    },
    {
        "id": 2,
        "title": "House for sale",
        "description": "",
        "area": "Queens",
        "listing_type": "House",
        "property_status": "Sale",
        "price": "1000000",
        "rental_frequency": null,
        "rooms": 4,
        "furnished": true,
        "pool": true,
        "elevator": true,
        "parking": true,
        "date_posted": "2023-01-24T04:21:12Z",
        "location": {
            "type": "Point",
            "coordinates": [
                40.690544,
                -73.836737
            ],
        },
        picture1: image1,
    },
    {
        "id": 3,
        "title": "Driveway for rent",
        "description": "If you are doing your groceries or just checking out the neighborhood and need a place to park.\r\nMy driveway is free - $20 per hour. Message me to book. Open now until 7pm",
        "area": "Brooklyn",
        "listing_type": "Parking Space",
        "property_status": null,
        "price": "20",
        "rental_frequency": null,
        "rooms": null,
        "furnished": false,
        "pool": false,
        "elevator": false,
        "parking": true,
        "date_posted": "2023-01-24T04:22:57Z",
        "location": {
            "type": "Point",
            "coordinates": [
                40.68597,
                -73.823451
            ],
        },
        picture1: image1,
    },
    {
        "id": 4,
        "title": "Apartment for rent.",
        "description": "CLEAN Method allows us to perform some logic and manipulate the form\r\nThe super() method allows us access to the form itself.\r\n Data is a dictionalry with key:value pair we extract into\r\nlatitude and longitude variables that are used above as the forms.floatfield.",
        "area": "Manhattan",
        "listing_type": "Appartment",
        "property_status": "Rent",
        "price": "4000",
        "rental_frequency": "Month",
        "rooms": null,
        "furnished": true,
        "pool": true,
        "elevator": true,
        "parking": true,
        "date_posted": "2023-01-24T04:28:25Z",
        "location": {
            "type": "Point",
            "coordinates": [
                40.757962,
                -73.976575
            ],
        },
        picture1: image1,
    },
    {
        "id": 5,
        "title": "Building for sale",
        "description": "Magic methods in Python are the special methods that start and end with the double underscores. They are also called dunder methods. Magic methods are not meant to be invoked directly by you, but the invocation happens internally from the class on a certain action. For example, when you add two numbers using the + operator, internally, the __add__() method will be called.",
        "area": "Bronx",
        "listing_type": "Appartment",
        "property_status": "Sale",
        "price": "2500000",
        "rental_frequency": null,
        "rooms": 8,
        "furnished": false,
        "pool": false,
        "elevator": true,
        "parking": true,
        "date_posted": "2023-01-24T04:30:19Z",
        "location": {
            "type": "Point",
            "coordinates": [
                40.833073,
                -73.917144
            ],
        },
        picture1: image1,
    }
];


export default myListings;