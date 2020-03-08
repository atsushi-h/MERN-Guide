import mongoose from 'mongoose';
import IUserDocument from './IUserDocument';

export default interface IPlaceDocument extends mongoose.Document {
  title: String,
  description: String,
  image: String,
  address: String,
  location: {
    lat: Number,
    lng: Number,
  },
  creator: IUserDocument,
}
