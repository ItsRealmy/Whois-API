const express = require("express");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT || 8080);

const cors = require("cors");
app.use(cors());

const { Domains } = require("check-domain-availability");

app.get("/:domain", (req, res) => {
    const { domain } = req.params;

    Domains.find(domain).then((isAvailable) => {
        if (isAvailable) {
            res.send({ status: "AVAILABLE" });
        } else {
            res.send({ status: "TAKEN" });
        }
    }).catch((err) => {
        res.send({ status: "ERR" });
    });
});