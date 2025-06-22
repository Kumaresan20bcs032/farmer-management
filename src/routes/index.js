const express = require("express");
const router = express.Router();
const createProduct = require("../controllers/product-management/createProduct");
const getProductDetails = require("../controllers/product-management/getProductDetails");
const deleteProduct = require("../controllers/product-management/deleteProduct");
const listProduct = require("../controllers/product-management/listProduct");
const updateProduct = require("../controllers/product-management/updateProduct");

const createUser = require("../controllers/user-management/createUser");
const getUserDetails = require("../controllers/user-management/getUserDetails");
const deleteUser = require("../controllers/user-management/deleteUser");
const loginUser = require("../controllers/user-management/loginUser");
const updateUser = require("../controllers/user-management/updateUser");

const createVendor = require("../controllers/vendor-management/createVendor");
const listVendor = require("../controllers/vendor-management/listVendor");
const updateVendor = require("../controllers/vendor-management/updateVendor");
const getVendorDetails = require("../controllers/vendor-management/getVendorDetails");
const deleteVendor = require("../controllers/vendor-management/deleteVendor");

const createFarmer = require("../controllers/farmer-managemnt/createFarmer");
const getFarmerDetails = require("../controllers/farmer-managemnt/getFarmerDetails");
const listFarmers = require("../controllers/farmer-managemnt/listFarmer");
const updateFarmer = require("../controllers/farmer-managemnt/updateFarmer");
const deleteFarmer = require("../controllers/farmer-managemnt/deleteFarmer");

const dashboardDetails = require("../controllers/dashboard/dashboard");


// validators
const productValidator = require("../validators/productValidator");
const paramIdValidator = require("../utils/mongoIdValidator");
const vendorValidator = require("../validators/vendorValidator");
const userValidator = require("../validators/userValidator");
const FarmerValidator = require("../validators/farmerValidator");

// middlewares
const userMiddleware = require("../middlewares/userMiddleware");
const farmerValidator = require("../validators/farmerValidator");

// Product routes
router.post("/product", [userMiddleware.validate, productValidator.create], createProduct.product);
router.get("/product/details/:id", [userMiddleware.validate, paramIdValidator.id], getProductDetails.get);
router.get("/product/list", [userMiddleware.validate,], listProduct.product);
router.delete("/product/:id", [userMiddleware.validate, paramIdValidator.id], deleteProduct.delete);
router.patch("/product/:id", [userMiddleware.validate, paramIdValidator.id, productValidator.update], updateProduct.update);

// Vendor roures
router.post("/vendor", [userMiddleware.validate, vendorValidator.create], createVendor.vendor);
router.get("/vendor/details/:id", [userMiddleware.validate, paramIdValidator.id], getVendorDetails.get);
router.get("/vendor/list", [userMiddleware.validate,], listVendor.list);
router.patch("/vendor/:id", [userMiddleware.validate, paramIdValidator.id, vendorValidator.update], updateVendor.update);
router.delete("/vendor/:id", [userMiddleware.validate, paramIdValidator.id], deleteVendor.delete)

// User routes
router.post("/user", [userValidator.create], createUser.user);
router.post("/user/login", [userValidator.login], loginUser.login);
router.get("/user/profile", [userMiddleware.validate], getUserDetails.get);
router.delete("/user", [userMiddleware.validate], deleteUser.delete)
router.patch("/user/profile", [userMiddleware.validate, userValidator.update], updateUser.update)

// Farmer routes
router.post("/farmer", [userMiddleware.validate, FarmerValidator.create, farmerValidator.create], createFarmer.create);
router.get("/farmer/details/:id", [userMiddleware.validate, paramIdValidator.id], getFarmerDetails.get);
router.get("/farmer/list", [userMiddleware.validate,], listFarmers.list);
router.patch("/farmer/:id", [userMiddleware.validate, farmerValidator.update, farmerValidator.update], updateFarmer.update);
router.delete("/farmer/:id", [userMiddleware.validate, paramIdValidator.id], deleteFarmer.delete);


// Dashboard routes
router.get("/dashboard", [userMiddleware.validate], dashboardDetails.dashboard)





module.exports = router;