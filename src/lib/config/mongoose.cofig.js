const mongoose = require("mongoose");

module.exports = {
  connectDB() {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Connected successsfully to mongodb"))
      .catch((err) => {
        console.log("Couldn't connnect mongodb");
        console.error(err);
      });
  },
};
