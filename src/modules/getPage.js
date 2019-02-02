const axios = require('axios');

function getPage(pageUrl) {
    return new Promise(function(resolve, reject) {
        axios
            .get(pageUrl, {
                timeout: 7500,
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
            })
            .then(function(response) {
                const doesBlockFrame = 'x-frame-options' in response.headers;

                resolve({
                    responseUrl: response.request.res.responseUrl,
                    dom: response.data,
                    doesBlockFrame
                });
            })
            .catch(function(response) {
                reject(response);
            });
    });
}

module.exports = getPage;
