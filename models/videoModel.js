const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    filename : { 
      type : String, 
      required : true 
    },
    uploadDate : { 
      type : Date,
      default: Date.now 
    },
    length : { 
      type : Number, 
      required : true 
    },
    chunkSize : { 
      type : Number, 
      default : 261120 
    }, 
    md5 : { 
      type : String, 
      required : true 
    }, 
    contentType : {
      type : String, 
      required : true 
    } 
});

module.exports = mongoose.model('Video', videoSchema);
