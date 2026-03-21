const express = require("express");
const {
  postAddHome,
  getHostHomes,
  getHome,
  putEditHome,
  deleteHome,
} = require("../controllers/hostController");
const {requireHost} = require("../middlewares/authMiddleware");

const hostRoutes = express.Router();

hostRoutes.get("/homes", requireHost, getHostHomes);

hostRoutes.get("/home/:homeId", requireHost, getHome);

hostRoutes.post("/add-home", requireHost, postAddHome);

hostRoutes.put("/edit-home/:homeId", requireHost, putEditHome);

hostRoutes.delete("/delete-home/:homeId", requireHost, deleteHome);

module.exports = {
  hostRoutes,
};
