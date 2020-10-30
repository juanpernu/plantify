import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'User name is required for user.'],
  },
  name: {
    type: String,
    required: [true, 'Name is required for user.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required for user.'],
  },
  password: {
    type: String,
    required: [true, 'Please specify a password.'],
  },
  plants: [{
    type: ObjectId,
    ref: "Plant"
  }]
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
