const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

const Schema =  mongoose.Schema;

const userModelSchema = new Schema({
    email : {
        type: String, 
        required: true, 
        unique: true
    },
    password : {
        type: String, 
        required: true
    }
});

// Hash the password before saving the user model
async function hashPassword(next){
        const user = this;
        const hash = await bcrypt.hash(user.password, 10);
        this.password = hash;
        next();
    }

    // Pass hashed password to pre-save hook
userModelSchema.pre('save', hashPassword)

// Method to compare given password with the database hash
userModelSchema.methods.isValidPassword = async function (password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const UserModel = mongoose.model('Users', userModelSchema);

module.exports = UserModel;