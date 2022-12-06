const nedb = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class User {
  constructor(dbPath) {
    // Ternary operator
    dbPath
      ? (this.db = new nedb({ filename: dbPath, autoload: true }))
      : (this.db = new nedb());
  }
  addUser = (email, password) => {
    const that = this;
    bcrypt.hash(password, saltRounds).then((hash) => {
      let entry = {
        user: email,
        password: hash,
      };
      that.db.insert(entry, (err) => {
        if (err) {
          console.log("User not added: ", email);
        }
      });
    });
  };
  userLookup = (user, cb) => {
    this.db.find({ user: user }, (err, entries) => {
      if (err) {
        return cb(null, null);
      } else {
        if (entries.length == 0) {
          return cb(null, null);
        }
        return cb(null, entries[0]);
      }
    });
  };
}
const userDao = new User();
module.exports = userDao;
