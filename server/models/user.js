/* eslint-disable no-underscore-dangle */

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
});

// Duplicate the ID field.
userSchema.virtual('id').get(function mapIdToVirtual() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export default mongoose.model('User', userSchema);
