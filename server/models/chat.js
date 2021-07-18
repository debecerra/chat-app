/* eslint-disable no-underscore-dangle */

import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  members: [{
    email: { type: String, required: true },
    admin: { type: Boolean, default: false },
  }],
});

// Duplicate the ID field.
chatSchema.virtual('id').get(function mapIdToVirtual() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
chatSchema.set('toJSON', { virtuals: true });
chatSchema.set('toObject', { virtuals: true });

export default mongoose.model('Chat', chatSchema);
