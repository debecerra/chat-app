/* eslint-disable no-underscore-dangle */

import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  body: { type: String, required: true },
  author: { type: String, required: true },
});

// Duplicate the ID field.
messageSchema.virtual('id').get(function mapIdToVirtual() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
messageSchema.set('toJSON', { virtuals: true });
messageSchema.set('toObject', { virtuals: true });

export default mongoose.model('Message', messageSchema);
