const app = require('./app');
require('./database');


async function init() {
    await app.listen(3005);
    console.log(' server on port 3005');
}

init();