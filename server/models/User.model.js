const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        minlength:[ 2, 'common gimme a legit first name of more than 2 characters.']
    },
    lastName: {
        type:String,
        minlength:[ 2, 'You gotta have a last name of more than 2 characters.']
    },
    userName: {
        type:String,
        unique:true,
        minlength:[ 2, 'Username must be minimum 2 characters.']
    },
    email: {
        type:String,
        unique:true,
        required:[true, "So youre saying its 2020 but you dont have an email address ? O_o"],
        validate:[
            val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        minlength:[
            8,
            'please enter a password of atleast 8 characters.'
        ]
    }
}, {timestamps:true});

UserSchema.virtual('confirmPassword', {
    get: () => this._confirmPassword,
    set: val => this._confirmPassword = val
});

UserSchema.pre('validate', function(next){
    if(this.password != this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hashedPw => {
            this.password = hashedPw;
            next();
        });
});



module.exports = mongoose.model('User', UserSchema);
