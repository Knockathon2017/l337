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

    getUsesTodayMoodData(userId){
        var happiness =0 ;
        var anger = 0;
        var neutral = 0;
        var fear = 0;
        var sadness = 0;
        var disgust = 0;
        var contempt = 0;
        var surprise = 0;
        var count = 0;
        return FaceTraceModel.find({User:userId}).then((data)=>{
            data.map((obj)=>{
                happiness = obj.Scores[0].happiness + happiness;
                anger = obj.Scores[0].anger + anger;
                sadness = obj.Scores[0].sadness + sadness;
                neutral = obj.Scores[0].neutral + neutral;
                fear = obj.Scores[0].fear + fear;
                disgust = obj.Scores[0].disgust + disgust;
                contempt = obj.Scores[0].contempt + contempt;
                surprise = obj.Scores[0].contempt + contempt;
                count=count+1;
            })
            happiness = happiness/count;
            anger = anger/count;
            sadness = sadness/count;
            neutral = neutral/count;
            fear = fear/count;
            disgust = disgust/count;
            contempt = contempt/count;
            surprise = surprise/count;
            var list = {happiness,sadness,anger,neutral,fear,disgust,contempt,surprise};
            let entries = Object.entries(list);
            // [["you",100],["me",75],["foo",116],["bar",15]]
            console.log(entries);
            let sorted = entries.sort((a, b) => { return (a[1] - b[1])})
            var m =sorted[sorted.length-1][0];
            return {Moods:{happiness,sadness,anger,neutral,fear,disgust,contempt,surprise}, overAllMood:m}
        })
    }

    getDataForSplineChart(userId, startDate, endDate) {
        console.log(startDate);
        return FaceTraceModel.find({$and:[{TracedDate:{ $gt: startDate, $lt: endDate}}, {User:userId}]}).then((data)=>{
            console.log(data);
            var happiness = [];
            var anger = [];
            var neutral = [];
            var fear = [];
            var sadness = [];
            var disgust = [];
            var contempt = [];
            var surprise = [];
            data.map((obj)=>{
                happiness.push(obj.Scores[0].happiness); 
                sadness.push(obj.Scores[0].sadness); 
                anger.push(obj.Scores[0].anger); 
                fear.push(obj.Scores[0].fear); 
                disgust.push(obj.Scores[0].disgust); 
                contempt.push(obj.Scores[0].contempt); 
            });
            return {happiness ,sadness, anger, fear, disgust, contempt}
        }).catch((err)=>{console.log(err)})
    }


}

export default FaceTrace;