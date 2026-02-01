require("dotenv").config();
const port = process.env.PORT || 8080;
const host = "localhost";
const express = require("express");
const cors = require("cors");
const app = express();

const session = require("express-session"); // express session

const swaggerUI = require("swagger-ui-express");
const yamljs = require("yamljs");

const swaggerDocument = yamljs.load("./docs/swagger.yaml");
//const swaggerDocument = require('./docs/swagger.json');

// const { sync } = require("./db")
const { sync, sessionStore } = require("./db");
// change to test delivers
// Test nr 2 for liteTracker ID

// app.get('/books', (req, res) => {
//     res.send(["Decameron", "Romeo and Juliet", "It"])
// })

app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSIONSECRET || "dev",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

sessionStore.sync();


require("./routes/bRoutes.js")(app);
require("./routes/uRoutes.js")(app);
require("./routes/eRoutes.js")(app);
require("./routes/rlRoutes.js")(app);

app.listen(8080, () => console.log("Server running on http://localhost:8080"));

app.listen(port, async () => {
  if (process.env.SYNC === "true") {
    await sync();
  }
  console.log(`API on aadressil: http://${host}:${port}`);
});
