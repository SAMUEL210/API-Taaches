var express = require("express");
var utModel = require("../models/utilisateur");
var { checkToken } = require("../utilities/token");
var { encrypt } = require("../utilities/crypto");

var router = express.Router();

router.post("/", async(req, rep) => {
    let { body } = req;
    body.mp = encrypt(body.mp);
    try {
        var utilisateur = new utModel(body);
        await utilisateur.save();
        rep.status(200).send({ succes: "UTILISATEUR_CREE" });
    } catch (e) {
        rep.status(409).send({ error: e.message });
    }
});

router.put("/:id", checkToken, async(req, rep) => {
    req.body.mp = encrypt(req.body.mp);
    var utilisateur = await utModel.findOneAndUpdate({ _id: req.params.id },
        req.body, { new: true }
    );
    res.status(200).send({ utilisateur });
});

module.exports = router;