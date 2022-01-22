module.exports = app => {
    const tracker = require("./tracker.controller")
    var router = require("express").Router();

    // -- tracker 
    router.post("/", tracker.save);

    // Retrieve all tracker
    router.get("/", tracker.findAll);

    // Retrieve a single tracker with id
    router.get("/:id", tracker.findOne);

    // Update tracker with id
    router.patch("/:id", tracker.update);

    // Delete tracker with id
    router.delete("/:id", tracker.delete);
    
    // router.patch("/schools/:id", tracker.addSchoolIntracker);

    app.use("/regate/api/v1/tracker/", router);
}