const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    customer: {
        firstName: {type: 'string', required: true},
        lastName: {type: 'string'},
        email: {type: 'string', required: true},
        age: {type: 'number'},
        phone: {type: 'string'},
        password: {type: 'string', required: true},
    },
    isRegistered: {type: Boolean, default: false},
    collection: `users`,
})

module.exports = mongoose.model('User', userSchema)