const axios = require('axios');

function getPage(pageUrl) {
    return new Promise(function(resolve, reject) {
        axios
            .get(pageUrl, {
                timeout: 2500
            })
            .then(function(response) {
                resolve([response.request.res.responseUrl, response.data]);
            })
            .catch(function(response) {
                reject(response);
            });
    });
}

module.exports = getPage;
