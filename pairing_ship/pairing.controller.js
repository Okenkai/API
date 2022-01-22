const db = require("../config/db");
const shipController = require("../ship/ship.controller");
const trackerController = require("../tracker/tracker.controller");

// -- Create pairing

exports.save = (req, res) => {
    if (req.body.tracker_id === "" || req.body.ship_id === ""){
        res.send({
            "error": "Veuillez remplir les champs requis"
        })
    }

    if (trackerController.isExist(req.body.tracker_id) || shipController.isExist(req.body.ship_id))
    {

        db.collection("pairing").add({
            "tracker_id": req.body.tracker_id,
            "ship_id": req.body.ship_id,
        }).then(function(docRef){
            let message = "pairing added successfully";
            db.collection("pairing").doc(docRef.id).update({
                "uid": docRef.id
            })
            console.log(message);
            res.status(201).send({
                "message": "pairing added successfully"
            });
        }).catch(function (error){
            let errorMassage = "Something went wrong: (";
            res.status(500).send({"error": errorMassage})
        });
    }else {
        res.status(404).send({"error": `Problem to add a ship or an tracker, it's not found: ${req.body.tracker_id} & ${req.body.ship_id}`});
    }
}

// -- To get all pairing
exports.findAll = async (req, res) => {
    try{
        const pairingQuerySnapshot = await db.collection("pairing").get();
        const pairing = [];

        pairingQuerySnapshot.forEach((doc) => {
            pairing.push(doc.data());
        });

        res.status(200).json(pairing);
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    db.collection("pairing").doc(id).get()
        .then(pairing => {
            if (!pairing.exists)
                res.status(404).send({ message: "Not found pairing with id " + id });
            else res.status(200).json(pairing.data());
        }).catch(function (error) {
            let errorToShow = "Error retrieving pairing with id=" + id
            console.error(errorToShow, error);
            res.status(500).send({
                message: errorToShow
            });
        });
};

// -- update pairing
exports.update = async (req, res) => {
    await db.collection("pairing").doc(req.params.id).set(req.body,{merge:true})
    .then(()=> res.json({"message": "pairing update successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

// -- delete pairing 
exports.delete = (req, res) => {
    db.collection("pairing").doc(req.params.id).delete()
    .then(()=> res.status(204).send({"message": "pairing delete successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

