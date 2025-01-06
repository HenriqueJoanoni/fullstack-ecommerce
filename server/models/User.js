const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    user_email: {type: String, required: true},
    user_phone: {type: String},
    user_password: {type: String, required: true},
    user_profile_picture: {type: String},
    user_access_level: {type: Number},
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema)
