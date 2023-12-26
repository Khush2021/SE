const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose
    .connect(process.env.MONOGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("Could not connect", err);
    });
};
