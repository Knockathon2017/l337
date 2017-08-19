'use strict';
import express from 'express';
import requestpromise from 'request-promise';
import FaceTrace from '../services/facetrace.js';


const router = new express.Router();
/**
   post image data
    */
router.post('/traceData', (request, response) => {
    try {
        console.log('tracedata3');
        new FaceTrace().saveFaceExpressionData(request.body)
            .then((data) => {
               console.log('sent success response', { responseBody: data });
                return response.status(200).json(data);
            }).catch((err) => {console.log(err)});
    } catch (error) {
        console.log(err);
    }
});


/**
    */
router.get('/getData/:userId/:startDate/:endDate', (request, response) => {
    
    try {
        
        const userId = request.params.userId;
        const startDate = request.params.startDate;
        const endDate = request.params.endDate;
        console.log(userId +" "+startDate+" "+endDate);
        new FaceTrace().getDataByUserAndDate(userId, startDate,endDate)
            .then((traceData) => {
               console.log('sent success response', { responseBody: traceData });
                return response.status(200).json(traceData);
            }).catch((err) => {console.log(err)});
    } catch (error) {
       console.log(err);
    }
});

router.get('/getTodayMood/:userId', (request, response) => {
    
    try {
        const userId = request.params.userId;
        new FaceTrace().getUsesTodayMoodData(userId)
            .then((traceData) => {
               console.log('sent success response', { responseBody: traceData });
                return response.status(200).json(traceData);
            }).catch((err) => {console.log(err)});
    } catch (error) {
       console.log(err);
    }
});

router.get('/getDataForSplineChart/:userId/:startDate/:endDate', (request, response) => {
    
    try {
        const userId = request.params.userId;
        new FaceTrace().getDataForSplineChart(userId,request.params.startDate,request.params.endDate )
            .then((traceData) => {
               console.log('sent success response', { responseBody: traceData });
                return response.status(200).json(traceData);
            }).catch((err) => {console.log(err)});
    } catch (error) {
       console.log(err);
    }
});

router.get('/summary/:overallMood',(request,response)=>{
    return response.render('facetrace',{overallMood:request.params.overallMood});
});




export default router;
