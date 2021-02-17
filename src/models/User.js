const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.gensalt(10);
    return (bcrypt.hash(password, salt));
}

module.exports = model('user', userSchema);