const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    contents: String,
    title: String,
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likes: [Schema.Types.ObjectId],
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);