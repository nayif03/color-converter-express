# MVC & Middleware

Date: Jul 10, 2019

# MVC

- Model
    - Database (Data persistency)
- View
    - React or Javascript
- Controller
    - Route Handlers

### MERN Stack

## Live Code (ColorConversion API)

- Controller directory
- Model directory
- Router directory
    - Express Router

## Read Section

- Read the middleware documentation from express

## Let's talk about

- Function signature
    - 2 parameters (req, res) → controller aka route handler
    - 3 parameters (req, res, next) → middleware (next is the next function in the request-response cycle)
- Metaphor of a lightning bolt ⚡️ going through your `index.js`
- It needs one handler or middleware to end the response

# Tickets:

*Choose one ticket and try to make it robust. The goal is not to do all of them but to think about "what can go wrong". So with each ticket comes with tasks beyond "making it work".*

- *Usage guid aka documentation aka README file*
- *Your code should not break but deliver error messages, what failed?*
- *Test intensively (extra: unit tests)*

---

## Implementing Middlewares

1. Create a logger middleware that logs on every request the following values
    - Request Method (HTTP verb e.g. GET)
    - the route that is requested
2. Create a middleware on `/convert` 
    - it should check if the query parameter color is part of the request
        - if not
            - respond with an error message `{"error": "Missing query parameter color" }`
            - you response should have the status code `400` which means `BAD REQUEST`
        - else call next

## Data persistence with a Database (mock)

For now we will be mocking (simulating) our database with `lowdb` 

LowDB can use the LocalStorage of the Browser or the FileSystem to persist its data via so called adapters. We want to use the FileSystem adapter to write our data to a JSON file.

On `convert/<convertmode>` routes handler (controller) we want to store the statistic data for the usage of our API. We want to find out which color gets converted the most. To do that we need to keep track of our color query parameter. 

- Use lowdb to store color value statistics in a db.json file
- Create a route `/statistic` that serves the statistics
example response:

    {
    	"colorStatistic": {
    		"hotpink": 1284,
    		"black": 1,
    		"i'm_not_a_valid_color_but_i_made_it_into_the_statistics": 2
    	}
    }

## Color Converter Class (Practice writing classes)

Write a class that handles our business logic "converting colors" we will still use [color-convert](https://www.npmjs.com/package/color-convert) but we want to be ready to switch to other packages at any time. 

Example:

    const converter = new ColorConverter("hsl","rgb", "1,2,3")
     // returns rgb color converted from hsl
    
    // or
    
    const converter = new ColorConverter()
    converter.from("hsl").to("rgb").color(1,2,3) // returns rgb color
    
    // How is that possible? Before you check that link, try a it your selfe. 
    // Even if it takes you 1 day to figure it out, this time is not wasted ;)
    // TIP: https://runkit.com/oliverwebr/5d250bee7a7ab2001380f8e8
