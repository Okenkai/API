const db = require("../config/db");

// -- Create event

exports.save = (req, res) => {
    if (req.body.name === ""){
        res.send({
            "error": "Veuillez remplir les champs requis"
        })
    }

    db.collection("event").add({
        "name": req.body.name,
    }).then(function(docRef){
        let message = "event added successfully";
        db.collection("event").doc(docRef.id).update({
            "uid": docRef.id
        })
        console.log(message);
        res.status(201).send({
            "message": "event added successfully"
        });
    }).catch(function (error){
        let errorMassage = "Something went wrong: (";
        res.status(500).send({"error": errorMassage})
    });
}

// -- To get all event
exports.findAll = async (req, res) => {
    try{
        const eventQuerySnapshot = await db.collection("event").get();
        const event = [];

        eventQuerySnapshot.forEach((doc) => {
            event.push(doc.data());
        });

        res.status(200).json(event);
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

// -- To get one event
exports.findOne = (req, res) => {
    const id = req.params.id;

    db.collection("event").doc(id).get()
        .then(event => {
            if (!event.exists)
                res.status(404).send({ message: "Not found event with id " + id });
            else res.status(200).json(event.data());
        }).catch(function (error) {
            let errorToShow = "Error retrieving event with id=" + id
            console.error(errorToShow, error);
            res.status(500).send({
                message: errorToShow
            });
        });
};

// -- update event
exports.update = async (req, res) => {
    await db.collection("event").doc(req.params.id).set(req.body,{merge:true})
    .then(()=> res.json({"message": "event update successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

// -- delete event 
exports.delete = (req, res) => {
    db.collection("event").doc(req.params.id).delete()
    .then(()=> res.status(204).send({"message": "event delete successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}


exports.isExist = async (eventId) => {
    try{
        const eventQuerySnapShot = await db.collection("event").doc(eventId).get();
        if(eventQuerySnapShot.data()) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}


