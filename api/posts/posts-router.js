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

router.get('/:id', async (req, res) => {
        try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({message: "The post with the specified ID does not exist"});
        }
    }  catch (error) {
        res.status(500).json({
            message: "The post information could not be received",
        })
    }
})

module.exports = router;
