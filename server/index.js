const express = require("express");
const app = express();
const mongoose = require("mongoose")
app.use(express.json());

const mongoUrl =
    "mongodb+srv://bradt1234:bradt1234@cluster0.grmn7bh.mongodb.net/?retryWrites=true&w=majority"

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

app.listen(5000, () => {
    console.log("Server Started");
});


app.post("/post", async (req, res) => {
    console.log(res.body);
    const { data } = req.body;

    try {
        if (data == "justin") {
            res.send({ status: "ok" });
        } else {
            res.send({ status: "User Not found" });
        }
    } catch (error) {
        res.send({ status: "Something went wrong try again" });
    }
});