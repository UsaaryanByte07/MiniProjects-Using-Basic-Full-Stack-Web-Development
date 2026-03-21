const Home = require("../models/Home");
const User = require("../models/User");
const path = require("path");
const rootDir = require("../utils/path-util");

const getHomes = async (req, res, next) => {
  try {
    const addedHomes = await Home.find();
    const userId = req.session.user._id;
    const wishlistHomes = await User.findById(userId).populate("wishlistHomes");
    const wishlistIds = wishlistHomes.wishlistHomes.map((home) =>
      home._id.toString(),
    );
    res.status(200).json({
      success: true,
      homes: addedHomes,
      wishlistHomeIds: wishlistIds,
    });
  } catch (error) {
    console.log("Error fetching homes:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching homes",
    });
  }
};

const getHomeDetails = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  try {
    const home = await Home.findById(homeId);
    if (!home) {
      return res
        .status(404)
        .json({ success: false, message: "Home not found." });
    }

    const userWithWishlist =
      await User.findById(userId).populate("wishlistHomes");
    const wishlistIds = userWithWishlist.wishlistHomes.map((h) =>
      h._id.toString(),
    );

    res.status(200).json({ success: true, home, wishlistIds });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch home details." });
  }
};

const getWishlist = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const userWithWishlist =
      await User.findById(userId).populate("wishlistHomes");
    const wishlist = userWithWishlist.wishlistHomes;
    const wishlistIds = wishlist.map((home) => home._id.toString());
    res.status(200).json({ success: true, wishlist, wishlistIds });
  } catch (error) {
    console.log("Error fetching wishlist:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist",
    });
  }
};

const postAddWishlist = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const homeId = req.body._id;
    const user = await User.findOne({ _id: userId });
    if (!user.wishlistHomes.map((id) => id.toString()).includes(homeId)) {
      user.wishlistHomes.push(homeId);
      await user.save();
    }
    res.json({ success: true, message: "Home added to wishlist" });
  } catch (error) {
    console.log(`Error adding to wishlist: ${error.message}`);
    res
      .status(500)
      .json({ success: false, message: "Error adding to wishlist" });
  }
};

const postRemoveWishlist = async (req, res, next) => {
  try {
    const homeId = req.body._id;
    const userId = req.session.user._id;
    const user = await User.findOne({ _id: userId });
    if (user.wishlistHomes.map((id) => id.toString()).includes(homeId)) {
      user.wishlistHomes = user.wishlistHomes.filter(
        (home) => home.toString() !== homeId,
      );
      await user.save();
    }
    res.json({ success: true, message: "Home removed from wishlist" });
  } catch (error) {
    console.log(`Error in removing from wishlist: ${error.message}`);
    res
      .status(500)
      .json({ success: false, message: "Error removing from wishlist" });
  }
};

const getRules = (req, res, next) => {
  const rulesFileName = "House_Rules.pdf";
  return res.download(
    path.join(rootDir, "public", "rules", rulesFileName),
    rulesFileName,
  );
};

module.exports = {
  getHomeDetails,
  getHomes,
  getWishlist,
  postAddWishlist,
  postRemoveWishlist,
  getRules,
};
