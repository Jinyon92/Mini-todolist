const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const todoSchema = new mongoose.Schema({
    title: { type : String },
    content: { type: String },
    completed: { type: String, default: false},
    date : {type: Date, default: Date.now}
});

todoSchema.statics.create = function (payload) {
    const todo = new this(payload);
    return todo.save();
};
  
todoSchema.statics.findAll = function () {
    return this.find({}).sort({"date" : -1});
};
  
todoSchema.statics.updateByTodoid = function (_id, payload) {
    return this.findOneAndUpdate({ _id }, payload, { new: true });
};
  
todoSchema.statics.deleteByTodoid = function (_id) {
    return this.remove({ _id });
};

module.exports = mongoose.model('Todo', todoSchema);