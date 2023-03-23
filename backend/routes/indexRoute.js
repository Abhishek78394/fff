const express = require("express");
const { homepage, signup, signin, signout, product_create,getAllProducts } = require("../controllers/indexController");
const router = express.Router();


// router.route("/").get(homepage);
router.get("/", homepage);

// // post /signup - create user
router.post("/signup", signup);

// // post /signin - login user
router.post("/signin", signin);

// // get /signout - logout user
router.get("/signout", signout);

// // post /insert - details
router.post("/insert", product_create);

// // gt / collect-data
router.get("/getdata",getAllProducts) 

module.exports = router;