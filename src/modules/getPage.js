const axios = require('axios');

function getPage(pageUrl) {
    return new Promise(function(resolve, reject) {
        axios
            .get(pageUrl, {
                timeout: 20500
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
