const mongoose = require('mongoose')
mongoose.connect(`mongodb://192.168.50.33:27017/${process.env.MONGODB_NAME}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', () => {console.log('connected to db', db.client.s.url)})