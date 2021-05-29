import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  members: [{
    email: { type: String, required: true },
    admin: { type: Boolean, default: false },
  }],
});

export default mongoose.model('Chat', chatSchema);
