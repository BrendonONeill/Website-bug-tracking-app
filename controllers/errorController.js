exports.errorHandler = async (err, req, res, next) => {
    (err.message.startsWith ('Email or Password not valid'))
    ? res.status(400).render('login/login',{message : 'Email or Password not valid'}):
    //res.status(404).render('login/login',{message : err.message });
    (err.message.endsWith ('Passwords are not the same') && req.type === 'create')
    ?res.status(400).render('users/createUser',{message : 'Passwords do not match', name: req.currentUser, currentUser : req.LogInUser}):
    (err.message.startsWith ('E11000'))
    ? res.status(400).render('users/createUser',{message : 'Email already used on another account', name: req.currentUser, currentUser : req.LogInUser}):
    (err.message.startsWith ('User validation failed'))
    ? res.status(400).render('users/createUser',{message : 'Passwords do not match', name: req.currentUser, currentUser : req.LogInUser}):
    (err.message.startsWith ('can you not read'))
    ?res.status(404).render('users/error',{message : "This page doesn't exist, Please try again later."}):
    (err.message.startsWith ('testing'))
    ?res.status(404).render('users/errorRelogin',{message : "Yo trying to sneak into my app"}):
    (err.message.startsWith ("This page doesn't exist"))
    ?res.status(404).render('users/error',{message : "This page doesn't exist, Please try again later.", name: req.currentUser, currentUser : req.LogInUser}): ""
  }