const mongoose = require("mongoose");
const User = require("../models/User");

class AuthRepository {
  async FindByEmail(email) {
    const user = await User.findOne({ email, deleted_at: null });
    return user;
  }

  async FindById(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const user = await User.findOne({ _id: id, deleted_at: null });
    return user;
  }

  async Create(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async Update(id, updates) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const user = await User.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { ...updates, updated_at: Date.now() },
      { new: true }
    );
    return user;
  }

  async Delete(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const user = await User.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: Date.now() },
      { new: true }
    );
    return user;
  }
}

module.exports = new AuthRepository();
