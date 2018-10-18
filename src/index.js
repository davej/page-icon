import 'source-map-support/register';

const url = require('url');
const cheerio = require('cheerio');
const getPage = require('./modules/getPage');
const getIconLinks = require('./modules/getIconLinks');
const downloadIcons = require('./modules/download/downloadIcons');
const findBestIcon = require('./modules/findBestIcon');

function isHttps(pageUrl) {
    return url.parse(pageUrl).protocol === 'https:';
}

function makeHttps(pageUrl) {
    const parsed = url.parse(pageUrl);
    parsed.protocol = 'https:';
    return url.format(parsed);
}

function main(pageUrl, options = {}) {
    const bestWithPref = function(icons) {
        return findBestIcon(icons, options.ext);
    };

    let title = '';

    let html;
    return getPage(pageUrl)
        .then(([responseUrl, dom]) => {
            const $ = cheerio.load(dom);
            if ($('head base').length === 0) {
                $('head').prepend(`<base href="${responseUrl}">`);
            }
            html = $.html();
            title = $('title')
                .first()
                .text()
                .trim();
            return getIconLinks(pageUrl, $);
        })
        .then(downloadIcons)
        .then(bestWithPref)
        .then(result => {
            if (result || isHttps(pageUrl)) {
                return Object.assign({}, result, {
                    title: title,
                    html
                });
            }

            const httpsUrl = makeHttps(pageUrl);
            return main(httpsUrl, options);
        })
        .catch(e => {
            e.title = title;
            throw e;
        });
}

module.exports = main;
