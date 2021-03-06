import mongoose, { Schema } from 'mongoose';

const articleSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Article = mongoose.model('Article', articleSchema);


export { Article };
