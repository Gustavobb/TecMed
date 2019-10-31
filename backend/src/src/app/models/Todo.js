const Mongoose = require('mongoose');

const TodoSchema = new Mongoose.Schema(
    {
      value: {
        type: String,
        required: true
      },
      user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    {
      timestamps: true,
      collection: 'Todo'
    }
  );
module.exports = Mongoose.model('Todo', TodoSchema);