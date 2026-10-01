const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Party App API is running 🚀"
    });
});

app.use("/api/party", routes);

module.exports = app;