const express = require("express");
var { checkToken } = require("../utilities/token");
var router = express.Router();

var dateModel = require("../models/date");

//Ajoute Une date
router.post("/", checkToken, async(req, rep) => {
    let { body } = req;
    try {
        var date = new dateModel(body);
        await date.save();
        rep.status(200).send({ date });
    } catch (e) {
        rep.status(409).send({ Erreur: e.message });
    }
});

//Retourne toutes les ates
router.get("/", checkToken, async(req, rep) => {
    var dates = await dateModel.find({});
    rep.status(200).send({ dates });
});

// Retourne la date dont ID est rensigné
router.put("/:id", checkToken, async(req, rep) => {
    var date = await dateModel.findOneAndUpdate({ _id: req.params.id },
        req.body, { new: true }
    );
    rep.status(200).send({ date });
});

// Retourne toutes les dates de ID de l'utilisateur renseigné
router.get("/u/:id", checkToken, async(req, rep) => {
    var dates = await dateModel.find({ utilisateur: req.params.id });
    rep.status(200).send({ dates });
});

// DELETE Toutes les Dates
// router.delete("/", checkToken, isAdmin, async(req, rep) => {
//     var dates = await dateModel.find({});
//     for (let i = 0; dates.length; i++) {
//         await dateModel.findOneAndRemove({ _id: dates[i]._id });
//     }
//     rep.status(200).send({ succes: "OK" });
// });

// DELETE Date par son ID
router.delete("/:id", checkToken, async(req, rep) => {
    await dateModel.find({ _id: req.params.id });
    rep.status(200).send({ succes: "OK" });
});

module.exports = router;