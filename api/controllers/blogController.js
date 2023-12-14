const fs = require("fs");

// reading file
const blogs = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8")
);

exports.checkID = (req, res, next, val) => {
  if (val > blogs.length) {
    return res
      .status(404)
      .json({ status: "fail", message: "That blog doesn't exist" });
  }
  next();
};

// HANDLERS
// GET ALL BLOGS
exports.getAllBlogs = (req, res) => {
  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
};

// GET BLOG BY ID
exports.getBlog = (req, res) => {
  // parse param
  const parameters = req.params;
  const idParam = parameters.id * 1;

  // find param
  const blog = blogs.find((el) => el.id === idParam);

  // send response
  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
};

// POST BLOG
exports.createBlog = (req, res) => {
  // parse body of req
  const blog = req.body;

  // make new blog
  const newId = blogs[blogs.length - 1].id + 1;
  const newBlog = Object.assign({ id: newId }, blog);

  // add blog to database
  blogs.push(newBlog);
  fs.writeFile(`${__dirname}/data/data.json`, JSON.stringify(blogs), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        blog: newBlog,
      },
    });
  });
};

// PATCH blog (! mostly depreciate)
exports.updateBlog = (req, res) => {
  // parse params
  const parameters = req.params;
  const idParam = parameters.id * 1;

  // response
  res.status(200).json({
    status: "success",
    data: `<updated blog ${idParam}>`,
  });
};

// DELETE blog
exports.deleteBlog = (req, res) => {
  // parse params
  const parameters = req.params;
  const idParam = parameters.id * 1;

  // response
  res.status(204).json({
    status: "success",
    data: null,
  });
};
