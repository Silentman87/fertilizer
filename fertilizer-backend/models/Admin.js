const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  UserName: { type: String, required: true, unique: true },
  Password: { type: String, required: true }
});

// Pre-save hook to hash password
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('Password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const Admin = mongoose.model('admin_mst', AdminSchema);
module.exports = Admin;
