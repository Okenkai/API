const express = require("express")
const cors = require('cors')
const db = require('./config/db')
const app = express()

var corsOptions = {

    origin: "http://localhost:8081"

}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.get("/:id", (req, res) => {

    if ( req.params.id.length == 0 ) {
        res.status(400).send({"error": "L'id est requis"})
    }

    db.collection("boc-users").add({
        "name": "Pierre",
        "age": 22,
        "gender":" male",

    }).then(function(docRef) {
        console.log("User added with success "+docRef.id)
    });
    res.send({

        "message":"Bonjour tout le monde !",
        "auteur": req.params.id
    });
});

//require(".app/routes/tutorial.routes")(app);

require("./ship/ship.route")(app);
require("./tracker/tracker.route")(app);
require("./pairing_ship/pairing.route")(app);
require("./event/event.route")(app);
require("./category/category.route")(app);
require("./race/race.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});