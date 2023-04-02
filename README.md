## Enviroment setup

1. `npm init`
2. `npm install --save express body-parser` and `npm install --save-dev nodemon`
3. add `app.js`
4. add `"start" : "nodemon app.js"` in `package.json`

## Configuration

▼`app.js` looks like;

```
// 1. coofiguration
const express = require("express");
const bodyParser = require("body-parser");

// 4. import router
const placesRoutes = require("./routes/places-route");

const app = express();

// 2. midleware setup
app.use(placesRoutes);

// 3. listen PORT
app.listen(5000);
```

## Routes setup

1. make files for midleware by their role in `routes` dir
   - you need to import express in every files even you've already import in `app.js`
   - you can name it whatever you want
2. setup `Router()` from express
3. `module.exports = router` to export the router
4. run app.js, then express automatically send back 200 status code and Content-Type application/json in the header
   - ** NOTE ** if you don't clear cache, you might see 304 status code

▼ router files look like after just basic setup;

```
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET Request in Places");

  // REST API uses json data
  res.json({ message: "It works!" });
});

module.exports = router;
```

5. `req.params` : get dynamic path
6. order is matter
7. `exports.SOMETHING = SOMETHING` : to exports multiple things

## API Endpoints

NEED TO RESEARCH ABOUT THIS MORE

- try not send any requests unless send exact path
  - `app.use("/api/ENDPOINT_FOR_ROUTER", ROUTER_NAME);`

## Handle Errors

- `res.status(STATUS_CODE).json({ MESSAGE: 'ANY_MESSAGE' });`
  OR
- use default error function provided by express
  1. setup code `app.use((error, req, res, next) => {})` in `app.js`
  2. setup code in routes files
  - if the routes use async func : you MUST use `next(error)`
  - if the routes use sync func : you could use `throw error` or `next(error)`

## MVC design pattern

Since this is backend app, we don't have view.

1. Models
2. Controler : correction of logic
