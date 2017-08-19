// // var _ = require('lodash');
// // var constants = require('./constants').default;
// // var helper = require('./helper');

// function SplitInterval(data,intervalType){
    
// }

function SplitIntervals(data,interval_type){
    var splitData={
        surprise:[],
        sadness:[],
        neutral:[],
        happiness:[],
        fear:[],
        disgust:[],
        contempt:[],
        anger:[]
    };
        // splitData.surprise=[];
        // splitData.sadness=[];
        // splitData.neutral=[];
        // splitData.happiness=[];
        // splitData.fear=[];
        // splitData.disgust=[];
        // splitData.contempt=[];
        // splitData.anger=[];

    var scores=_.map(data,'Scores');
    scores.forEach(function(v,i,all){
        v[0].sadness=parseFloat(v[0].sadness).toFixed(4);
        v[0].surprise=parseFloat(v[0].surprise).toFixed(4);
        v[0].neutral=parseFloat(v[0].neutral).toFixed(4);
        v[0].happiness=parseFloat(v[0].happiness).toFixed(4);
        v[0].fear=parseFloat(v[0].fear).toFixed(4);
        v[0].disgust=parseFloat(v[0].disgust).toFixed(4);
        v[0].contempt=parseFloat(v[0].contempt).toFixed(4);
        v[0].anger=parseFloat(v[0].anger).toFixed(4);
    });
    splitData.surprise.push(_.sum(_.map(scores,(o)=>o[0])));
    splitData.sadness.push(_.sum(_.map(scores,'sadness')));
    splitData.neutral.push(_.sum(_.map(scores,'neutral')));
    splitData.happiness.push(_.sum(_.map(scores,'happiness')));
    splitData.fear.push(_.sum(_.map(scores,'fear')));
    splitData.disgust.push(_.sum(_.map(scores,'disgust')));
    splitData.contempt.push(_.sum(_.map(scores,'contempt')));
    splitData.anger.push(_.sum(_.map(scores,'anger'))); 
    
    return splitData;

}
// function SplitIntervals(data, interval_type) {
//     var interval = [];
//     var date = new Date();
//     var splitData=[];
//     var intervalWiseData={};
//     var intervalSegment='';
//     switch (interval_type) {
//         case 'day':
//             var hours = date.getHours();
//             intervalSegment = hours + (3 - (hours % 3));
//             interval = constants.dayInterval[intervalSegment];
//             console.log('intervalSegment, interval'+intervalSegment+' '+interval);
//             splitData = Aggregate(data, intervalSegment, interval_type);
//             return Object.assign(intervalWiseData, {interval}, {splitData});
//             break;
//         case 'week':
//             var day = date.getDay();
//             if (day === 0)
//                 return ['Sunday'];
//             else
//                 for (var i = 0; i <= day; i++) {
//                     interval.push(constants.weekDayInterval[i]);
//                 }
//             splitData=Aggregate(data, intervalSegment, interval_type);
//             return Object.assign(intervalWiseData, {interval}, {splitData});
//             break;
//         case 'month':
//             var currDate = date.getDate();
//             intervalSegment=Math.ceil(currDate/7);
//             interval = constants.monthInterval[intervalSegment];
//             splitData = Aggregate(data,interval_type);
//             return Object.assign(intervalWiseData,{interval},{splitData});
//             break;
//     }

// }

// function Aggregate(data, intervalSegment, by) {
//     var splitData={};
//         splitData.surprise=[];
//         splitData.sadness=[];
//         splitData.neutral=[];
//         splitData.happiness=[];
//         splitData.fear=[];
//         splitData.disgust=[];
//         splitData.contempt=[];
//         splitData.anger=[];
    
//     switch (by) {
//         case 'day':
//             var lHours=0;
//             var uHours=0;
//             var lDate=new Date();
//             lDate.setHours(lHours);
//             var uDate=new Date();
//             uDate.setHours(uHours);

//             data.forEach(function(v,i,x){

//             });
//                                                     // for(var i=1;i<=4;i++){
//                                                     // while(uDate.getHours()!==intervalSegment){
//                                                     //     uDate.setHours(uDate.getHours()+3);
//                                                     //     console.log('uDate :'+uDate.getHours()+'  lDate'+lDate.getHours());
//                                                     //     var intv = data.map(function(o){
//                                                     //         var tDate = new Date(o.TracedDate);
//                                                     //         if((tDate > lDate) && (tDate < uDate))
//                                                     //             return o;
//                                                     //         else return null;
//                                                     //     });
//                                                     //     if(intv)
                                                        
//                                                         // var intv=data.map(function(v,i,al){
//                                                         //     var len = 
//                                                         // })
//                 var chunks=_.chunk(data,11);
//                 chunks.forEach(function(v,i,all){
//                 var scores = _.map(v,'Scores');
//                 splitData.surprise.push(_.sumBy(scores,function(o){return o.surprise;}));
//                 splitData.sadness.push(_.sumBy(scores,function(o){return o.sadness;}));
//                 splitData.neutral.push(_.sumBy(scores,function(o){return o.neutral;}));
//                 splitData.happiness.push(_.sumBy(scores,function(o){return o.happiness;}));
//                 splitData.fear.push(_.sumBy(scores,function(o){return o.fear;}));
//                 splitData.disgust.push(_.sumBy(scores,function(o){return o.disgust;}));
//                 splitData.contempt.push(_.sumBy(scores,function(o){return o.contempt;}));
//                 splitData.anger.push(_.sumBy(scores,function(o){return o.anger;}));              
//                 });               
                
//                 lDate.setHours(lHours+3);
//             // }
//             return splitData;
//         case 'week':
//             var date=new Date();
//             var day=date.getDay();
//             var scores='';
//             if(day==0){
//                 scores= data.map('Scores');

//                 splitData.surprise.push(_.sumBy(scores,function(o){return o.surprise;}));
//                 splitData.sadness.push(_.sumBy(scores,function(o){return o.sadness;}));
//                 splitData.neutral.push(_.sumBy(scores,function(o){return o.neutral;}));
//                 splitData.happiness.push(_.sumBy(scores,function(o){return o.happiness;}));
//                 splitData.fear.push(_.sumBy(scores,function(o){return o.fear;}));
//                 splitData.disgust.push(_.sumBy(scores,function(o){return o.disgust;}));
//                 splitData.contempt.push(_.sumBy(scores,function(o){return o.contempt;}));
//                 splitData.anger.push(_.sumBy(scores,function(o){return o.anger;}));

//             }else{
//                 for(var i=0;i<=day;i++){
//                     var tDate=new Date();
//                     tDate.setDate(tDate.getDate()-(day-i));
//                     var intv =data.map(function(o){
//                         var tracedDate=new Date(o.TracedDate);
//                         if(tracedDate.getDate() == tDate.getDate())
//                             return o;
//                     });
//                     scores = intv.map('Scores');
//                     splitData.surprise.push(_.sumBy(scores,function(o){return o.surprise;}));
//                     splitData.sadness.push(_.sumBy(scores,function(o){return o.sadness;}));
//                     splitData.neutral.push(_.sumBy(scores,function(o){return o.neutral;}));
//                     splitData.happiness.push(_.sumBy(scores,function(o){return o.happiness;}));
//                     splitData.fear.push(_.sumBy(scores,function(o){return o.fear;}));
//                     splitData.disgust.push(_.sumBy(scores,function(o){return o.disgust;}));
//                     splitData.contempt.push(_.sumBy(scores,function(o){return o.contempt;}));
//                     splitData.anger.push(_.sumBy(scores,function(o){return o.anger;}));
//                 }
//                 return splitData;
//             }
//         case 'month':
//             var currDate=new Date();
//             var lDate=currDate.getDate();
//             lDate=date.setDate(1);
//             var uDate=(new Date()).setDate(7) > new Date() ? new Date():(new Date()).setDate(7);

//             for(var i=1;i<=intervalSegment;i++){
//                 var intv = data.map(function (o) {
//                     var tDate = new Date(o.tracedDate);
//                     if (tDate.getDate() > lDate && t.getDate() <= uDate)
//                         return o;
//                 });
//             var scores = intv.map('Scores');
//                     splitData.surprise.push(_.sumBy(scores,function(o){return o.surprise;}));
//                     splitData.sadness.push(_.sumBy(scores,function(o){return o.sadness;}));
//                     splitData.neutral.push(_.sumBy(scores,function(o){return o.neutral;}));
//                     splitData.happiness.push(_.sumBy(scores,function(o){return o.happiness;}));
//                     splitData.fear.push(_.sumBy(scores,function(o){return o.fear;}));
//                     splitData.disgust.push(_.sumBy(scores,function(o){return o.disgust;}));
//                     splitData.contempt.push(_.sumBy(scores,function(o){return o.contempt;}));
//                     splitData.anger.push(_.sumBy(scores,function(o){return o.anger;}));
//             uDate = uDate.setDate(uDate.getDate()+7) > new Date() ? new Date() : uDate.setDate(uDate.getDate()+7);
//             lDate.setDate(lDate.getDate()+7);
//             }
//         return splitData;
//     }
// }

// function Average(data) {
//     return _.mean(data);
// }

// function FindMax(data) {
//     return _.max(data);
// }

// function FindMin(data) {
//     return _.min(data);
// }
