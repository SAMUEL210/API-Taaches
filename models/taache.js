const mongoose = require("mongoose");
var utModel = require("../models/utilisateur");

const taachesSchema = new mongoose.Schema({
    utilisateur: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    date: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    texte: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        required: true,
    },
});

taachesSchema.pre("save", async function(next) {
    let utilisateur = await utModel.find({ _id: this.utilisateur });
    if (!utilisateur) next(Error("UTILISATEUR_EXIST_PAS"));
    else next();
});

var taachesModel = mongoose.model("taache", taachesSchema);

module.exports = taachesModel;