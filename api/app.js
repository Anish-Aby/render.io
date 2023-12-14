const express = require("express");
const morgan = require("morgan");

const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");

// express app init
const app = express();

// middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(morgan("dev"));

//  mounting a router
app.use("/blogs", blogRouter);
app.use("/users", userRouter);

// export app
module.exports = app;
