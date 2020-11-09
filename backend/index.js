"use strict"
  const app = require("./app");
  const login = require("./routes/customer/login");
  const signup = require("./routes/customer/signup");


  app.use("/login", login);
  app.use("/signup", signup);
  app.listen(3001, () => {
    console.log(`Server listening on port 3001`);
  });