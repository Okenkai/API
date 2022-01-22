module.exports = app => {
    const race = require("./race.controller")
    var router = require("express").Router();

    // -- race 
    router.post("/", race.save);

    // Retrieve all race
    router.get("/", race.findAll);

    // Retrieve a single race with id
    router.get("/:id", race.findOne);

    // Update race with id
    router.patch("/:id", race.update);

    // Delete race with id
    router.delete("/:id", race.delete);
    

    app.use("/regate/api/v1/race/", router);
}