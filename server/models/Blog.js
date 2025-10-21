const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: { type: String, required: true },
  featuredImage: String,
  tags: [String],
  category: {
    type: String,
    enum: ['news', 'tips', 'updates', 'guide'],
    default: 'news'
  },
  author: { type: String, default: 'Admin' },
  published: { type: Boolean, default: false },
  publishedAt: Date,
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
