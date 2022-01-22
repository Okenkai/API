module.exports = app => {
    const ship = require("./ship.controller")
    var router = require("express").Router();

    // -- ship 
    router.post("/", ship.save);

    // Retrieve all ship
    router.get("/", ship.findAll);

    // Retrieve a single ship with id
    router.get("/:id", ship.findOne);

    // Update ship with id
    router.patch("/:id", ship.update);

    // Delete ship with id
    router.delete("/:id", ship.delete);
    

    app.use("/regate/api/v1/ship/", router);
}