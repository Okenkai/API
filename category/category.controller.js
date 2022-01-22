const db = require("../config/db");
const eventController = require("../event/event.controller");

// -- Create category

exports.save = (req, res) => {
    if (req.body.name === "" || req.body.event_id === ""){
        res.send({
            "error": "Veuillez remplir les champs requis"
        })
    }
    
    if (eventController.isExist(req.body.event_id))
    {

        db.collection("category").add({
            "name": req.body.name,
            "event_id": req.body.event_id,
        }).then(function(docRef){
            let message = "category added successfully";
            db.collection("category").doc(docRef.id).update({
                "uid": docRef.id
            })
            console.log(message);
            res.status(201).send({
                "message": "category added successfully"
            });
        }).catch(function (error){
            let errorMassage = "Something went wrong: (";
            res.status(500).send({"error": errorMassage})
        });
    }else {
        res.status(404).send({"error": `Problem to add event, it's not found: ${req.body.event_id}`});
    }
}

// -- To get all category
exports.findAll = async (req, res) => {
    try{
        const categoryQuerySnapshot = await db.collection("category").get();
        const category = [];

        categoryQuerySnapshot.forEach((doc) => {
            category.push(doc.data());
        });

        res.status(200).json(category);
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

// -- To get one category
exports.findOne = (req, res) => {
    const id = req.params.id;

    db.collection("category").doc(id).get()
        .then(category => {
            if (!category.exists)
                res.status(404).send({ message: "Not found category with id " + id });
            else res.status(200).json(category.data());
        }).catch(function (error) {
            let errorToShow = "Error retrieving category with id=" + id
            console.error(errorToShow, error);
            res.status(500).send({
                message: errorToShow
            });
        });
};

// -- update category
exports.update = async (req, res) => {
    await db.collection("category").doc(req.params.id).set(req.body,{merge:true})
    .then(()=> res.json({"message": "category update successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

// -- delete category 
exports.delete = (req, res) => {
    db.collection("category").doc(req.params.id).delete()
    .then(()=> res.status(204).send({"message": "category delete successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}


exports.isExist = async (categoryId) => {
    try{
        const categoryQuerySnapShot = await db.collection("category").doc(categoryId).get();
        if(categoryQuerySnapShot.data()) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}


