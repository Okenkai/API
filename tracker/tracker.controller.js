const db = require("../config/db");

// -- Create tracker

exports.save = (req, res) => {
    if (req.body.name === "" || req.body.tracker_uuid === ""){
        res.send({
            "error": "Veuillez remplir les champs requis"
        })
    }

    db.collection("tracker").add({
        "name": req.body.name,
        "tracker_uuid": req.body.tracker_uuid,
    }).then(function(docRef){
        let message = "tracker added successfully";
        db.collection("tracker").doc(docRef.id).update({
            "uid": docRef.id
        })
        console.log(message);
        res.status(201).send({
            "message": "tracker added successfully"
        });
    }).catch(function (error){
        let errorMassage = "Something went wrong: (";
        res.status(500).send({"error": errorMassage})
    });
}

// -- To get all tracker
exports.findAll = async (req, res) => {
    try{
        const trackerQuerySnapshot = await db.collection("tracker").get();
        const tracker = [];

        trackerQuerySnapshot.forEach((doc) => {
            tracker.push(doc.data());
        });

        res.status(200).json(tracker);
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    db.collection("tracker").doc(id).get()
        .then(tracker => {
            if (!tracker.exists)
                res.status(404).send({ message: "Not found tracker with id " + id });
            else res.status(200).json(tracker.data());
        }).catch(function (error) {
            let errorToShow = "Error retrieving tracker with id=" + id
            console.error(errorToShow, error);
            res.status(500).send({
                message: errorToShow
            });
        });
};

// -- update tracker
exports.update = async (req, res) => {
    await db.collection("tracker").doc(req.params.id).set(req.body,{merge:true})
    .then(()=> res.json({"message": "tracker update successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

// -- delete tracker 
exports.delete = (req, res) => {
    db.collection("tracker").doc(req.params.id).delete()
    .then(()=> res.status(204).send({"message": "tracker delete successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}


exports.isExist = async (trackerId) => {
    try{
        const trackerQuerySnapShot = await db.collection("tracker").doc(trackerId).get();
        if(trackerQuerySnapShot.data()) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}


