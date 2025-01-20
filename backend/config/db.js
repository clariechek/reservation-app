const mongoose = require("mongoose");

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
  try {
  await mongoose.connect(process.env.MONGO_URI, clientOptions); // { useNewUrlParser: true, useUnifiedTopology: true });
    // .then(() => console.log("MongoDB connected"))
    // .catch(err => console.error("Error connecting to MongoDB:", err));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
