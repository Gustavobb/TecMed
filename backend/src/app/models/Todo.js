const Mongoose = require('mongoose');

const ExampleSchema = new Mongoose.Schema(
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
      collection: 'Example'
    }
  );
module.exports = Mongoose.model('Example', ExampleSchema);