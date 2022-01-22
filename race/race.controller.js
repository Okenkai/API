const db = require("../config/db");
const categoryController = require("../category/category.controller");

// -- Create race

exports.save = (req, res) => {
    if (req.body.name === "" || req.body.category_id === ""){
        res.send({
            "error": "Veuillez remplir les champs requis"
        })
    }
    
    if (categoryController.isExist(req.body.category_id))
    {

        db.collection("race").add({
            "name": req.body.name,
            "category_id": req.body.category_id,
        }).then(function(docRef){
            let message = "race added successfully";
            db.collection("race").doc(docRef.id).update({
                "uid": docRef.id
            })
            console.log(message);
            res.status(201).send({
                "message": "race added successfully"
            });
        }).catch(function (error){
            let errorMassage = "Something went wrong: (";
            res.status(500).send({"error": errorMassage})
        });
    }else {
        res.status(404).send({"error": `Problem to add category, it's not found: ${req.body.category_id}`});
    }
}

// -- To get all race
exports.findAll = async (req, res) => {
    try{
        const raceQuerySnapshot = await db.collection("race").get();
        const race = [];

        raceQuerySnapshot.forEach((doc) => {
            race.push(doc.data());
        });

        res.status(200).json(race);
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

// -- To get one race
exports.findOne = (req, res) => {
    const id = req.params.id;

    db.collection("race").doc(id).get()
        .then(race => {
            if (!race.exists)
                res.status(404).send({ message: "Not found race with id " + id });
            else res.status(200).json(race.data());
        }).catch(function (error) {
            let errorToShow = "Error retrieving race with id=" + id
            console.error(errorToShow, error);
            res.status(500).send({
                message: errorToShow
            });
        });
};

// -- update race
exports.update = async (req, res) => {
    await db.collection("race").doc(req.params.id).set(req.body,{merge:true})
    .then(()=> res.json({"message": "race update successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

// -- delete race 
exports.delete = (req, res) => {
    db.collection("race").doc(req.params.id).delete()
    .then(()=> res.status(204).send({"message": "race delete successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}


exports.isExist = async (raceId) => {
    try{
        const raceQuerySnapShot = await db.collection("race").doc(raceId).get();
        if(raceQuerySnapShot.data()) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}


