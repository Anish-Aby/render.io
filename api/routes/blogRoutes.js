const express = require("express");
const blogController = require(`${__dirname}/../controllers/blogController`);

// blog router
const router = express.Router();

// param middleware (checking id validity)
router.param("id", blogController.checkID);

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);
router
  .route("/:id")
  .get(blogController.getBlog)
  .post(blogController.updateBlog)
  .delete(blogController.deleteBlog);

// exporting router
module.exports = router;
