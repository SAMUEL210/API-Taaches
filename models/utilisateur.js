const mongoose = require("mongoose");
var validator = require("email-validator");
var taacheSchema = require("../models/taache");

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mp: {
        iv: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            require: true,
        },
    },
});

//Hook de verification si utilisateur exist déja et email valide
utilisateurSchema.pre("save", async function(next) {
    if (validator.validate(this.email)) {
        let utilisateur = await utilisateurModel.findOne({ email: this.email });
        if (utilisateur) next(Error("UTILISATEUR_EXIST"));
        else next();
    } else {
        next(Error("EMAIL_PAS_VALIDE"));
    }
});

// Hook de Supression des taches  avant la supression de l'utilisateur
utilisateurSchema.pre("deleteOne", async function(next) {
    let id = this.getQuery()["_id"];
    let taaches = await taacheSchema.find({ utilisateur: id });
    for (let i = 0; i < taaches.length; i++) {
        await taacheSchema.findOneAndRemove({ _id: taaches[i]._id });
    }
    next();
});

var utilisateurModel = mongoose.model("utilisateur", utilisateurSchema);

module.exports = utilisateurModel;