const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: Schema.Types.ObjectId,
    contents: String,
    title: String,
    likes: [Schema.Types.ObjectId],
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);