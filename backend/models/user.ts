import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

interface IUserDocument extends mongoose.Document {
  name: String,
  email: String,
  password: String,
  image: String,
  places: String,
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: { type: String, required: true },
});

// plugin
userSchema.plugin(uniqueValidator);

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
