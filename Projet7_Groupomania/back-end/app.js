const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors');
const app = express();

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comment");

const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect("mongodb+srv://"  + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0.ensudns.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(helmet({crossOriginResourcePolicy: false,}));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true, 
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/posts", postsRoutes);
app.use("/api/comment", commentsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;