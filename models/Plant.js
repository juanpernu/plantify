import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

/* PlantSchema will correspond to a collection in your MongoDB database. */
const PlantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this plant.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  owner: {
    type: ObjectId,
    ref: "User"
  },
  species: {
    type: String,
    required: [true, 'Please specify the species of your plant.'],
    maxlength: [30, 'Species specified cannot be more than 40 characters'],
  },
  age: {
    type: Number,
  },
  poddy_trained: {
    type: Boolean,
  },
  diet: {
    type: Array,
  },
  image_url: {
    required: [true, 'Please provide an image url for this plant.'],
    type: String,
  },
  likes: {
    type: Array,
  },
  dislikes: {
    type: Array,
  },
});

export default mongoose.models.Plant || mongoose.model('Plant', PlantSchema);
