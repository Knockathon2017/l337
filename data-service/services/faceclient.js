import url from 'url';
import Promise from 'bluebird';
import requestpromise from 'request-promise';
import Util from '../util/util';

class CFSClient {
    constructor(requestpromiseInstance, loggerInstace) {
        this.logger = loggerInstace;
        this.cfsBaseUrl = global.settings.CFS_URL;
        this.cfsAPiVersion = global.settings.CFS_API_VERSION;
        this.requestPromise = !Util.isNullorEmpty(requestpromiseInstance) ? requestpromiseInstance : requestpromise;
    }

    postBase64FileInCFS(quoteId, fileName, idToken, fileBase64Data) {
        const trimmedQuoteId = Util.trim(quoteId);
        const trimmedFileName = Util.trim(fileName).replace(/\r?\n|\r/g, '');
        const cfsPostFileUrl = url.resolve(this.cfsBaseUrl, `${this.cfsAPiVersion}/${trimmedQuoteId}/${trimmedFileName}`);
        const options = {
            headers: {
                'harmony-access-key': idToken,
                'content-type': 'application/json',
                'Harmony-Request-Id': this.logger._metadata.requestId // eslint-disable-line no-underscore-dangle
            },
            uri: cfsPostFileUrl,
            method: 'POST',
            body: { base64Encoded: fileBase64Data, fileName, mimeType: 'application/pdf' },
            json: true
        };
        this.logger.info('Uploading file in cfs.', { data: { fileName, folderName: trimmedQuoteId } });
        return this.requestPromise.post(options).catch(errResponse => {
            if (errResponse.error.status === 401 || errResponse.error.status === 403) {
                return Promise.reject({
                    statusCode: errResponse.error.status
                });
            }
            this.logger.warn('Error occurred while posting file in cfs.', { errorData: errResponse.error });
            return Promise.reject({ statusCode: 500, error: {} });
        });
    }
}

 export default CFSClient;

