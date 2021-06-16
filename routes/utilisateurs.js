var express = require("express");
var router = express.Router();
var utModel = require("../models/utilisateur");
var { encrypt } = require("../utilities/crypto");
var { checkToken } = require("../utilities/token");

//Ajoute un utilisateur http://hote:port/utilisateurs/
router.post("/", async(req, rep) => {
    let { body } = req;
    body.mp = encrypt(body.mp);
    try {
        var utilisateur = new utModel(body);
        await utilisateur.save();
        rep.status(200).send({ utilisateur });
    } catch (e) {
        rep.status(409).send({ error: e.message });
    }
});

//GET tous les utlisateur http://hote:port/utilisateurs/*
router.get("/", checkToken, async(req, rep) => {
    var utilsateurs = await utModel.find({});
    rep.status(200).send({ utilsateurs });
});

//Modifie un utilisateur http://hote:port/utilisateurs/
router.put("/:id", async(req, rep) => {
    var utilisateur = await utModel.findOneAndUpdate({ _id: req.params.id },
        req.body, { new: true }
    );
    res.status(200).send({ utilisateur });
});

//Get un utilisateur par son ID http://hote:port/utilisateurs/id
router.get("/:id", async(req, rep) => {
    var utilsateur = await utModel.findOne({ _id: req.params.id });
    rep.status(200).send({ utilsateur });
});

//Suprimmer un utilisateur par son ID http://hote:port/utilisateurs/id
router.delete("/:id", async(req, rep) => {
    try {
        var utilisateur = await utModel.deleteOne({ _id: req.params.id });
        rep.status(200).send({ succes: "Ok" });
    } catch (e) {
        rep.status(409).send({ error: e.message });
    }
});

module.exports = router;