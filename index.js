const express = require("express");
const mongoose = require("mongoose");
var routerUtilisateur = require("./routes/utilisateurs");
var routerTaache = require("./routes/taaches");
var routerDate = require("./routes/dates");
var routerLogin = require("./routes/login");
var routerSignIn = require("./routes/signUp");
var routerHome = require("./routes/home");
var cors = require("cors");
require("dotenv").config();

var app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.bd_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
var bd = mongoose.connection;
bd.on("error", console.error.bind(console, "ERREUR CONENCTION: "));
bd.once("open", () => console.log("STATUS_BD : ", bd.states[bd._readyState]));

app.use(express.json());
app.use(cors({ origin: "*", exposedHeaders: "authorization" }));

app.use("/", routerHome);
app.use("/utilisateurs", routerUtilisateur);
app.use("/taaches", routerTaache);
app.use("/dates", routerDate);
app.use("/login", routerLogin);
app.use("/signin", routerSignIn);

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur en cour sur " + HOST + ":" + PORT);
});