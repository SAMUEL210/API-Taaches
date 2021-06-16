var express = require("express");
var router = express.Router();
var taaModel = require("../models/taache");

// POST une taache
router.post("/", async(req, rep) => {
    let { body } = req;
    try {
        var taache = new taaModel(body);
        await taache.save();
        rep.status(200).send({ taache });
    } catch (e) {
        rep.status(409).send({ erreur: e.message });
    }
});

//GET toutes les taches
router.get("/", async(req, rep) => {
    var taaches = await taaModel.find({});
    rep.status(200).send({ taaches });
});

//GET Taaches par utilisateur_ID => http://hote/port/taaches/u/id_utilisateur
router.get("/u/:id", async(req, rep) => {
    var taaches = await taaModel.find({ utilisateur: req.params.id });
    rep.status(200).send({ taaches });
});

// GET taaches par date_ID
router.get("/d/:id", async(req, rep) => {
    var taaches = await taaModel.find({ date: req.params.id });
    rep.status(200).send({ taaches });
});
//MODIFIER taache par son ID
router.put("/:id", async(req, rep) => {
    var taache = await taaModel.findOneAndUpdate({ _id: req.params.id },
        req.body, { new: true }
    );
    res.status(200).send({ utilisateur });
});

//GET taaches par son ID
router.get("/:id", async(req, rep) => {
    var taache = await taaModel.findOne({ _id: req.params.id });
    rep.status(200).send({ taache });
});

//DELETE taaches par son ID
router.delete("/:id", async(req, rep) => {
    var taaches = await taaModel.findOneAndRemove({ _id: req.params.id });
    rep.status(200).send({ succes: "OK" });
});

// DELETE toutes les taches
router.delete("/", async(req, rep) => {
    var taaches = await taaModel.find({});
    for (let i = 0; i < taaches.length; i++) {
        await taaModel.findOneAndRemove({ _id: taaches[i]._id });
    }
    rep.status(200).send({ succes: "OK" });
});

// DELETE toutes les taches de l'utilisateur.
router.delete("/s/u/:id", async(req, rep) => {
    var taaches = await taaModel.find({ utilisateur: req.params.id });
    for (let i = 0; i < taaches.length; i++) {
        await taaModel.findOneAndRemove({ _id: taaches[i]._id });
    }
    rep.status(200).send({ succes: "OK" });
});

module.exports = router;