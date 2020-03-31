const bcrypt = require('bcrypt');

function checkPass(str, hash) {
  return bcrypt.compareSync(str, hash);
}

module.exports = checkPass;
