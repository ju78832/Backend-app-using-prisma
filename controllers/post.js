const { post } = require("../prisma/index");

const createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;

    const result = await post.create({
      data: {
        slug,
        title,
        body,
        author: { connect: { id: authorId } },
      },
    });
    res.json({ message: "Created Post", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const result = await post.update({
      where: { id: id },
      data: {
        title: title,
        body: body,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await post.delete({
      where: { id: id },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res, next) => {
  try {
    const result = await post.findMany();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, updatePost, deletePost, getPost };
