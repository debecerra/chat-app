import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
});

export default mongoose.model('User', userSchema);
