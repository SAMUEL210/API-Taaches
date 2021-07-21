var express = require("express");
var utilisateurModel = require("../models/utilisateur");
var { decrypt } = require("../utilities/crypto");
var { createToken } = require("../utilities/token");

var router = express.Router();

router.post("/", async(req, rep) => {
    var utilisateur = await utilisateurModel.findOne({ email: req.body.email });

    if (utilisateur) {
        if (decrypt(utilisateur.mp) == req.body.mp) {
            const token = createToken(utilisateur);
            let id = utilisateur._id;
            rep.header("Authorization", token);
            delete utilisateur.mp;
            rep.status(200).send({ id: id });
        } else rep.send({ error: "MP_INCORECTE" });
    } else rep.send({ error: "UTILISATEUR_EXIST_PAS" });
});

module.exports = router;