const auth = require("./db/authControllers");



module.exports = {
 
    loginUser: async (req, res) => {
      if (req.cookies.auth !== undefined) {
        res.status(200).json({error: true, message: 'You are already logged in'})
      } else {
        let user = await auth.getUser(req.get('username'));
        if (user === -1) {
          res.status(200).json({error: true, message: "User not found"});
        } else {
          const password = req.get('password');
          if (password !== user.password) {
            res.status(200).json({error: true, message: "Incorrect password"});
          } else {
            res.cookie('auth', user.username, { maxAge: 300000 }) //Keeps cookie for 5 minutes
            res.cookie('userId', user.id, { maxAge: 800000 })
            res.status(200).json({error: false, message: "You are logged in"});
          }
        }
      }
    },
    logoutUser: (req, res) => {
      if (req.cookies.auth === undefined) {
        res.status(200).json({error: true, message: "You are not logged in."});
      } else {
        res.clearCookie('auth');
        res.status(200).json({error: false, message: "You are logged out."});
      }
    },
    registerUser: async (req, res) => {
      if (req.cookies.auth !== undefined) {
        res.status(200).json({error: true, message: 'You are already logged in'})
      } else {
        const user = await auth.getUser(req.get('username'));
        if (user !== -1) {
          res.status(200).json({error: true, message: "User already exists. Please try again."});
        } else {
          const password = req.get('password');
          auth.addUser(req, password);
          res.status(200).json({error: false, message: "User created"});
        }
      }
    }
  }