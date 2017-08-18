import FaceApiClient from './faceApiClient.js';
import FaceTraceModel from '../model/faceTraceModel.js'

class FaceTrace {

    saveFaceExpressionData(data) {
        console.log(data);
        var url = data.url;
        var userId = data.userId;
        return new FaceApiClient().getDataFromImage(data.base64Data).then((response) => {
            var d = JSON.parse(response);
            console.log(d);
            if (d.length > 0) {
                var scores = d[0].scores;
                var model = new FaceTraceModel();
                model.User = data.userId;
                model.Scores = scores;
                model.Url = data.url;
                model.TracedDate = this.getUtcDateInEpochFormat();
                //console.log(FaceTraceModel);
                model.save({ new: true }).then(data => { console.log(data) })
                    .catch(error => console.log(error));
            }
        })
    }

    getUtcDateInEpochFormat() {
        const timeInSeconds = (new Date(new Date().toUTCString()).getTime());
        const timeInSecondsInt = timeInSeconds >= 0 ?
            Math.floor(timeInSeconds) : Math.ceil(timeInSeconds);
        return timeInSecondsInt;
    }

    getDataByUserAndDate(userId, startDate, endDate) {
        console.log(startDate);
        return FaceTraceModel.find({$and:[{TracedDate:{ $gt: startDate, $lt: endDate}}, {User:userId}]}).then((data)=>{
            console.log(data);
            return data;
        }).catch((err)=>{console.log(err)})
    }


}

export default FaceTrace;