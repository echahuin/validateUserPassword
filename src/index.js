const app = require('./app');
require('dotenv').config();


require('./database');


async function init() {
    await app.listen(3008);
    console.log(' server on port 3008');
}

init();