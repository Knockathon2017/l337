import requestpromise from 'request-promise';

class FaceApiClient {

    getDataFromImage(base64ata){
       // console.log(base64ata)
        var decodedImage = new Buffer(base64ata, 'base64');
        console.log(decodedImage);
        const options = {
            headers: {
                'content-type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': "a2047f002cf6473ebd62885b02785c9e" // eslint-disable-line no-underscore-dangle
            },
            uri: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?",
            method: 'POST',
            body: decodedImage,
            //json: true
        };
        
         return requestpromise.post(options).then(response=>{
            console.log('dipti')
            return response;
        }).catch(errResponse => {
            console.log('errResponse');
            if (errResponse.error.status === 400 || errResponse.error.status === 403) {
               console.log('errResponse234');
            }
         //console.log(errResponse);
           console.log('errResponse234'+errResponse);
        });
    }

}

export default FaceApiClient;