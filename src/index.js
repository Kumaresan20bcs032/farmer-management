const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/index");
const MongoDbConnection = require("./config/mongoose");
const { successResponse, errorResponse } = require("./utils/responseHandler");


const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

new MongoDbConnection();

app.get("/", (req, res) => {
    return successResponse(res, 200, "Product management api service working fine.")
})
app.use("/api/v1/", router);

/**
 * @description Catch-all route to handle undefined endpoints and return a 404 error response.
 */

app.use(/(.*)/, (req, res) => {
    return errorResponse(res, 400, "Request route not found.");
})


const PORT = process?.env?.PORT ?? 4003;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})