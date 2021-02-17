const mogoose = require('mongoose');

mogoose.connect('mongodb://localhost/simplejwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('database is connected'))