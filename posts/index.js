const express = require("express");

const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); // to nenerate random id
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(cors()); // oue app is gooing to work like middlewire

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
  } catch (err) {
    console.log("Creating post error:", err);
  }

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recevied Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
