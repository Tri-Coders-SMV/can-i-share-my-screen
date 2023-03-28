const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: Schema.Types.ObjectId,
    title: String,
    contents: String,
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likes: {type: [Schema.Types.ObjectId], unique: true } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);