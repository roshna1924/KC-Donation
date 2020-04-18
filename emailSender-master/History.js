var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

var historySchema = mongoose.Schema({
  donarName: {type:String, required: true},
  donarAddedDate: {type:Date, required: true},
  foodName: {type:String, required: true},
  foodExpiry: {type:Date, required: true},
  foodWeight: {type:Number, required: true},
  foodPrice: {type:Float, required: true},
  foodAddress: {type:String, required: true},
  requesterName: {type:String},
  requesterCompDate: {type:Date},
  referenceId : {type: Object}
});

var History = module.exports = mongoose.model('History', historySchema);

