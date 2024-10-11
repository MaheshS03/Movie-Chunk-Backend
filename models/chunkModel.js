const mongoose = require('mongoose');

const chunkSchema = new mongoose.Schema(
  {
    files_id : { 
      type : mongoose.Schema.Types.ObjectId, 
      ref : 'Video', 
      required : true 
    }, 
    n : { 
      type : Number, 
      required : true 
    }, 
    data : { 
      type : Buffer, 
      required : true 
    }
});

module.exports = mongoose.model('Chunk', chunkSchema);
