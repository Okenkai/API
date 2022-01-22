const db = require("../config/db");

// -- Create ship

exports.save = (req, res) => {
    if (req.body.name === "" || req.body.skipper === "" ){
        res.send({
            "error": "Veuillez remplir les champs requis"
        })
    }

    db.collection("ship").add({
        "name": req.body.name,
        "skipper": req.body.skipper,
    }).then(function(docRef){
        let message = "ship added successfully";
        db.collection("ship").doc(docRef.id).update({
            "uid": docRef.id
        })
        console.log(message);
        res.status(201).send({
            "message": "ship added successfully"
        });
    }).catch(function (error){
        let errorMassage = "Something went wrong: (";
        res.status(500).send({"error": errorMassage})
    });
}

// -- To get all ship
exports.findAll = async (req, res) => {
    try{
        const shipQuerySnapshot = await db.collection("ship").get();
        const ship = [];

        shipQuerySnapshot.forEach((doc) => {
            ship.push(doc.data());
        });

        res.status(200).json(ship);
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    db.collection("ship").doc(id).get()
        .then(ship => {
            if (!ship.exists)
                res.status(404).send({ message: "Not found ship with id " + id });
            else res.status(200).json(ship.data());
        }).catch(function (error) {
            let errorToShow = "Error retrieving ship with id=" + id
            console.error(errorToShow, error);
            res.status(500).send({
                message: errorToShow
            });
        });
};

// -- update ship
exports.update = async (req, res) => {
    await db.collection("ship").doc(req.params.id).set(req.body,{merge:true})
    .then(()=> res.json({"message": "ship update successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

// -- delete ship 
exports.delete = (req, res) => {
    db.collection("ship").doc(req.params.id).delete()
    .then(()=> res.status(204).send({"message": "ship delete successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}


exports.isExist = async (shipId) => {
    try{
        const shipQuerySnapShot = await db.collection("ship").doc(shipId).get();
        if(shipQuerySnapShot.data()) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}


