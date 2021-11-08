const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:"pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user:"jzo497m15fniuv2j",
    password:"mxmx17f6torlq96y",
    database:"s9t9q7r73x8xpkl6",
    multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('En linea...');
    }
  });

  module.exports = mysqlConnection;