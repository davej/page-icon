const pageIcon = require('../');
(async () => {
    try {
        const pi = await pageIcon('https://messenger.com/');
        console.dir({ title: pi.title, source: pi.source });
    } catch (err) {
        console.log(err);
    }
})();
