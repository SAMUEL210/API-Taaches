var express = require("express");
var { checkToken } = require("../utilities/token");
var taaModel = require("../models/taache");
var utModel = require("../models/utilisateur");
var dateModel = require("../models/date");
var router = express.Router();

// Ajoute une taache
router.post("/", checkToken, async(req, rep) => {
    let { body } = req;
    let utilisateur = await utModel.findOne({ _id: body.utilisateur });
    let date = await dateModel.findOne({ _id: body.date });
    if (utilisateur && date) {
        try {
            var taache = new taaModel(body);
            await taache.save();
            rep.status(200).send({ taache });
        } catch (e) {
            rep.status(409).send({ error: e.message });
        }
    } else rep.status(409).send({ error: "Utilisateur ou date pas valide!" });
});

//Retourne une taache par son ID
router.get("/:id", checkToken, async(req, rep) => {
    var taache = await taaModel.findOne({ _id: req.params.id });
    rep.status(200).send({ taache });
});

// Retourne toutes les taches
router.get("/", checkToken, async(req, rep) => {
    var taaches = await taaModel.find({});
    rep.status(200).send({ taaches });
});

// Retourne des taaches par ID de l'utilisateur
router.get("/u/:id", checkToken, async(req, rep) => {
    var taaches = await taaModel.find({ utilisateur: req.params.id });
    rep.status(200).send({ taaches });
});

// Retourne des taaches par ID de la date
router.get("/d/:id", checkToken, async(req, rep) => {
    var taaches = await taaModel.find({ date: req.params.id });
    rep.status(200).send({ taaches });
});

// MODIFIER taache par son ID
router.put("/:id", checkToken, async(req, rep) => {
    let { body } = req;
    let utilisateur = await utModel.findOne({ _id: body.utilisateur });
    let date = await dateModel.findOne({ _id: body.date });
    if (utilisateur && date) {
        try {
            var taache = await taaModel.findOneAndUpdate({ _id: req.params.id },
                body, { new: true }
            );
            rep.status(200).send({ taache });
        } catch (e) {
            rep.status(409).send({ error: e.message });
        }
    } else rep.status(409).send({ error: "Utilisateur ou date pas valide!" });
});

//DELETE taaches par son ID
router.delete("/:id", checkToken, async(req, rep) => {
    var taaches = await taaModel.findOneAndRemove({ _id: req.params.id });
    rep.status(200).send({ succes: "OK" });
});

//DELETE toutes les taches
router.delete("/", checkToken, async(req, rep) => {
    var taaches = await taaModel.find({});
    for (let i = 0; i < taaches.length; i++) {
        await taaModel.findOneAndRemove({ _id: taaches[i]._id });
    }
    rep.status(200).send({ succes: "OK" });
});

// DELETE toutes les taches de l'utilisateur.
router.delete("/s/u/:id", checkToken, async(req, rep) => {
    var taaches = await taaModel.find({ utilisateur: req.params.id });
    for (let i = 0; i < taaches.length; i++) {
        await taaModel.findOneAndRemove({ _id: taaches[i]._id });
    }
    rep.status(200).send({ succes: "OK" });
});

module.exports = router;