module.exports = app => {
    const event = require("./event.controller")
    var router = require("express").Router();

    // -- event 
    router.post("/", event.save);

    // Retrieve all event
    router.get("/", event.findAll);

    // Retrieve a single event with id
    router.get("/:id", event.findOne);

    // Update event with id
    router.patch("/:id", event.update);

    // Delete event with id
    router.delete("/:id", event.delete);
    

    app.use("/regate/api/v1/event/", router);
}