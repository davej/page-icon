const pageIcon = require('../');
(async () => {
    try {
        const pi = await pageIcon('https://messenger.com/');
        console.log({
            title: pi.title,
            source: pi.source,
            frameBlocked: pi.isFrameBlocked
        });
    } catch (err) {
        console.log(err);
    }
})();
