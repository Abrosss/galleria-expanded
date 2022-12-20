
const User = require("../models/User");


exports.postGoogleSignup = async (req, res) => {
  let email = req.body.email
  let username = req.body.username

  //check if username exists
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) {
    res.status(200).send(emailExists)
  }

  //CREATE USER

 else {
  let user = new User({
    username: username,
    email: email,
    location: "",
    password: "googleauth"



  })

  //SAVE USER
  try {
    const savedUser = await user.save()
    res.status(200).send(req.user)
  } catch (err) {
    res.status(400).send(err)
  }
 } 
};

