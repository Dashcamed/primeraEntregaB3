import mongoose from 'mongoose';

const collection = 'pets';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  specie: { type: String, required: true },
  birthDate: { type: Date, required: true },
  adopted: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null },
  image: {
    type: [
      {
        name: { type: String, required: true },
        reference: { type: String, required: true },
      },
    ],
    default: [],
  },
});

const petModel = mongoose.model(collection, schema);

export default petModel;
