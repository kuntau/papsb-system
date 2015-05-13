
var mongoose         = require('mongoose'),
    bcrypt           = require('bcrypt-nodejs');

var userSchema       = mongoose.Schema({

  local : {
      id          : Number,
      email       : String,
      password    : String,
      firstName   : String
  }

});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
