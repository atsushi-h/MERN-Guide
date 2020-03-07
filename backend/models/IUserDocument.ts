import mongoose from 'mongoose';
import IPlaceDocument from './IPlaceDocument';

export default interface IUserDocument extends mongoose.Document {
  name: String,
  email: String,
  password: String,
  image: String,
  places: IPlaceDocument[],
}
