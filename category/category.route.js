module.exports = app => {
    const category = require("./category.controller")
    var router = require("express").Router();

    // -- category 
    router.post("/", category.save);

    // Retrieve all category
    router.get("/", category.findAll);

    // Retrieve a single category with id
    router.get("/:id", category.findOne);

    // Update category with id
    router.patch("/:id", category.update);

    // Delete category with id
    router.delete("/:id", category.delete);
    

    app.use("/regate/api/v1/category/", router);
}