import mongoose, { Schema } from 'mongoose';

interface IPlaceDocument extends mongoose.Document {
  title: String,
  description: String,
  image: String,
  address: String,
  location: {
    lat: Number,
    lng: Number,
  },
  creator: String,
}

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: String, required: true },
});

const Place = mongoose.model<IPlaceDocument>('Place', placeSchema);

export default Place;
