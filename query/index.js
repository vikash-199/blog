const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[id];
    post.comments.push({ id, content });
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening at 4002");
});

/*
posts === {
 'hdkljb' : {
   id : 'bklj;'
   title: 'Post title'
   comments : [
   {id:'noji', content:'comment 1'}]
  },
  'hdkgljb' : {
   id : 'bklj;'
   title: 'Post title'
   comments : [
   {id:'noji', content:'comment 2'}]
  },
}
  */
