var argon2 = require('argon2');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// log in
// router.post('/login', function (req, res, next) {
//   if ('username' in req.body && req.body.username != null && 'password' in req.body && req.body.password != null) {
//     req.pool.getConnection(function (err, connection) {
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//         return;
//       }
//       var query = "SELECT User_ID, Username, Email, Password, Type FROM Users WHERE Username = ? AND Password = ?;";
//       connection.query(query, [req.body.username, req.body.password], function (err, rows, fields) {
//         connection.release(); // release connection
//         if (err) {
//           console.log(err);
//           res.sendStatus(500);
//           return;
//         }
//         if (rows.length > 0) {
//           req.session.user = rows[0];
//           res.sendStatus(200);
//         } else {
//           res.sendStatus(401);
//         }
//       } else {
//         res.sendStatus(401);
//       }
//       });

//   } else {
//     res.sendStatus(400);
//   }

// });






// login
router.post('/login', function (req, res, next) {

  if ('username' in req.body && req.body.username != null && 'password' in req.body && req.body.password != null) {
    req.pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query = "SELECT user_ID, username, email, password, type FROM users WHERE username = ?;";
      connection.query(query, [req.body.username], function (err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        // check if they are same in db
        if (rows.length > 0) {

          const myAsyncFunc = async (hashKey, password) => { //<-- declare as an async function
            try {
              //console.log(hashKey);
              //console.log(password);
              if (await argon2.verify(hashKey, password)) {
                req.session.user = rows[0];
                res.sendStatus(200);
              } else {
                // password did not match
                res.sendStatus(402);
              }
            } catch (err) {
              // internal failure
            }
          }


          myAsyncFunc(rows[0].password, req.body.password);


        } else {
          res.sendStatus(401);
        }
      });
    });


  } else {
    res.sendStatus(400);
  }

});

// register
router.post('/register', async function(req, res, next) {
  let hash;
  try {
    hash = await argon2.hash(req.body.password);
    // console.log(hash);

  } catch (err) {
    console.log("hash error!");
  }
  // argon2 hash
  if('username' in req.body && req.body.username != null && 'password' in req.body && req.body.password != null && 'email' in req.body && req.body.email != null) {
      req.pool.getConnection( function(err, connection) {
          if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          let query = "SELECT username FROM users WHERE username = ?;";
          connection.query(query,[req.body.username], function(err, rows, fields) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }
            if (rows.length > 0) {
              res.sendStatus(409);
              return;
            } else {


              //hash = hashp(req.body.password);


              query = "INSERT INTO users (username, email, password, type) VALUES (?, ?, ?, 'user');";
              connection.query(query, [req.body.username, req.body.email, hash], function (err, rows, fields) {
                if (err) {
                  console.log(err);
                  res.sendStatus(403);
                  return;
                }
                query = "SELECT user_id, username, email, password FROM users WHERE username = ?;";
                connection.query(query, [req.body.username], function (err, rows, fields) {
                  connection.release();
                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                  }
                  if (rows.length > 0) {
                    // console.log('success');
                    // console.log(rows);
                    req.session.user = rows[0];
                    res.sendStatus(200);
                  } else {
                    // console.log('bad login');
                    res.sendStatus(401);
                  }
                });
              });
            }
          });
      });

  } else {
      res.sendStatus(400);
  }

});

module.exports = router;
