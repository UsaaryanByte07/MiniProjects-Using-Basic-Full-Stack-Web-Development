const path = require("path");
const Home = require("../models/Home");
const { deleteFile, uploadsDir } = require("../utils/photo-storage-util");

const getHostHomes = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const addedHomes = await Home.find({ host: userId });
    res.status(200).json({ success: true, homes: addedHomes });
  } catch (error) {
    console.log("Error fetching homes:", error.message);
    res.status(500).json({ success: false, message: "Error fetching homes" });
  }
};

const getHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  try {
    const home = await Home.findOne({
      _id: homeId,
      host: req.session.user._id,
    });
    if (!home) {
      return res
        .status(404)
        .json({ success: false, message: "Home not found." });
    }
    res.status(200).json({ success: true, home });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch home." });
  }
};

const postAddHome = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { homeName, price, location, rating, description } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const newHome = new Home({
      homeName,
      price,
      location,
      rating,
      photoUrl,
      description,
      host: userId,
    });
    await newHome.save();
    res
      .status(201)
      .json({ success: true, message: "Home added successfully!" });
  } catch (error) {
    console.log("Error Occurred while Writing the Data:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error adding home. Please try again.",
      });
  }
};

const putEditHome = async (req, res, next) => {
  const { homeId } = req.params;
  const { homeName, price, location, rating, description } = req.body;
  const updatedData = { homeName, price, location, rating, description };
  try {
    if (req.file) {
      const existingHome = await Home.findOne({
        _id,
        host: req.session.user._id,
      });
      if (existingHome && existingHome.photoUrl) {
        deleteFile(path.join(uploadsDir, path.basename(existingHome.photoUrl)));
      }
      updatedData.photoUrl = `/uploads/${req.file.filename}`;
    }

    await Home.findOneAndUpdate(
      { _id: homeId, host: req.session.user._id },
      updatedData,
      { new: true },
    );
    res
      .status(200)
      .json({ success: true, message: "Home updated successfully!" });
  } catch (error) {
    console.log("Error Occurred while Writing the Data:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating home. Please try again.",
      });
  }
};

const deleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  try {
    const home = await Home.findOneAndDelete({
      _id: homeId,
      host: req.session.user._id,
    });
    if (home && home.photoUrl) {
      deleteFile(path.join(uploadsDir, path.basename(home.photoUrl)));
    }
    res.status(200).json({ success: true, message: "Home deleted successfully!" });
  } catch (err) {
    console.log(`${err.message}`);
    res.status(500).json({ success: false, message: "Error deleting home. Please try again." });
  }
};

module.exports = {
  postAddHome,
  getHostHomes,
  getHome,
  putEditHome,
  deleteHome,
};
