const { body, validationResult } = require("express-validator");

const postService = require("../service/post.service");

exports.getAll = async (req, res) => {
  try {
    const posts = await postService.getAllPostsWithCommentCount();

    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.createPost = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { text } = req.body;
    const { username } = req.decoded;

    const post = await postService.createPost(username, text);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.createComment = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { text } = req.body;
    const { username } = req.decoded;
    const { postId } = req.params;

    const post = await postService.createComment(username, text, postId);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.getPostsByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await postService.getPostsByUsername(username);

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.getPostsByToken = async (req, res) => {
  try {
    const { username } = req.decoded;
    const posts = await postService.getPostsByUsername(username);

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.validate = (method) => {
  switch (method) {
    case "createPost": {
      return [
        body("text", "text should be between 1 to 1000 characters").isLength({
          min: 1,
          max: 1000,
        }),
      ];
    }
  }
};
