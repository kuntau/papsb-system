/* user schema */

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({

  username: String,
  password: String,
  email   : String

});

// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);
