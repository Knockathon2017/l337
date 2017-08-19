import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const faceTraceModel = new Schema({
  User: {
    type: Object,
  },
  
  Scores: [{}],
  Url:String,
  TracedDate:Number,

}, { collections: 'FaceData' });

//TODO: need to uncomment after proper testing
// folderSchema.index({ Name: 1, Company: 1 }, { unique: true });


export default mongoose.model('FaceData', faceTraceModel);











