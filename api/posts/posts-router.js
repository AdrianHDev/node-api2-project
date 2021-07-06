// implement your posts router here
const express = require("express");
const Post = require("./posts-model");
const router = express.Router();

router.get("/", (req, res) => {
  Post.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({
      message: "The post information could not be received",
    });
  }
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.insert(req.body)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const { contents, title } = req.body;
  const post = await Post.findById(id);
  if (!post) {
    res
      .status(404)
      .json({ message: "The post with specified ID does not exist" });
  } else if (!contents || !title) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.update(id, req.body)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch(() =>
        res
          .status(500)
          .json({ message: "The post information could not be modified" })
      );
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    res
      .status(404)
      .json({ message: "The post with specified ID does not exist" });
  } else {
    Post.remove(id)
      .then(() => {
        res.status(200).json({ message: "Deleted successfuly." });
      })
      .catch(() =>
        res.status(500).json({ message: "The post could not be removed" })
      );
  }
});

router.get("/:id/comments", async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await Post.findPostComments(id);
    if (!comments.title) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(200).json(comments);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The comments information could not be retrieved" });
  }
});

module.exports = router;
