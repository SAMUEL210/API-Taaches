const mongoose = require("mongoose");

var utilisateurModel = require("../models/utilisateur");

const dateSchema = new mongoose.Schema({
    texte: {
        type: String,
        require: true,
    },
    utilisateur: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
});

dateSchema.pre("save", async function(next) {
    if (!this.texte) {
        next(
            Error("date validation failed: utilisateur: Path `texte` is required.")
        );
    } else {
        var utilisateur = await utilisateurModel.findOne({ _id: this.utilisateur });
        if (utilisateur) {
            var DatesUtilisateur = await dateModel.find({
                utilisateur: this.utilisateur,
            });
            for (let i = 0; i < DatesUtilisateur.length; i++) {
                if (DatesUtilisateur[i].texte === this.texte)
                    next(Error("DATE_DEJA_ACTIVE"));
            }
            next();
        } else {
            next(Error("UTILISATEUR_EXISTE_PAS"));
        }
    }
});
var dateModel = mongoose.model("date", dateSchema);

module.exports = dateModel;