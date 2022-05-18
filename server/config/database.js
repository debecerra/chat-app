/**
 * Defines database configuration.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default () => {
  mongoose.connect(process.env.DB_CONNECTION_URL, OPTIONS, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('MongoDB database connection established');
    }
  });
};
