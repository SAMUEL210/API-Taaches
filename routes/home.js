var express = require("express");

var router = express.Router();
router.get("/", (req, rep) => {
    rep.send("BIENVENUE SUR l'API DE TAACHES");
});

module.exports = router;