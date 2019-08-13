const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async show(req, res) {
    const { id: user } = req.params;

    const loggedDev = await Dev.findById(user);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found"
      });
    }

    return res.json(loggedDev);
  },

  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    if (!loggedDev) {
      return res.status(404).json({
        error: true,
        message: "User not found"
      });
    }

    const users = await Dev.find({
      $and: [
        { _id: { $ne: loggedDev._id } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const user = await Dev.findOne({ user: username });

    if (user) {
      return res.json(user);
    }

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const { name, bio, avatar_url: avatar } = response.data;

      const dev = await Dev.create({
        name: name || username,
        user: username,
        bio,
        avatar
      });

      return res.json(dev);
    } catch (error) {
      return res.status(404).json({
        error: true,
        message: "User not found"
      });
    }
  }
};
