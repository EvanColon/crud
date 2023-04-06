const auth = require("./db/authentication");



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
        if (!bcrypt.compareSync(password, user.password)) {
          res.status(200).json({error: true, message: "Incorrect password"});
        } else {
          res.cookie('auth', user.username, { maxAge: 600000 }) //Keeps cookie for 10 minutes
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
      res.clearCookie('permission_level');
      res.status(200).json({error: false, message: "You are logged out."});
    }
  }
}