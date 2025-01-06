const mongoose = require('mongoose')

/** connection URI needs to be set this way to work on localhost */
mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.MONGODB_NAME}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected to db', db.client.s.url)
})