module.exports = app => {
    const pairing = require("./pairing.controller")
    var router = require("express").Router();

    // -- pairing 
    router.post("/", pairing.save);

    // Retrieve all pairing
    router.get("/", pairing.findAll);

    // Retrieve a single pairing with id
    router.get("/:id", pairing.findOne);

    // Update pairing with id
    router.patch("/:id", pairing.update);

    // Delete pairing with id
    router.delete("/:id", pairing.delete);
    

    app.use("/regate/api/v1/pairing/", router);
}