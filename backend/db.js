const mongoose = require("mongoose");

const mongo_URL = "mongodb://127.0.0.1:27017/Gofood";

const main = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongo_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");

    // Fetch collections
    const db = mongoose.connection.db;
    const foodItemsCollection = db.collection("foodItems");
    const foodCategoryCollection = db.collection("foodCategory");

    // Fetch data using Promise.all for parallel execution
    const [foodItems, foodCategory] = await Promise.all([
      foodItemsCollection.find({}).toArray(),
      foodCategoryCollection.find({}).toArray(),
    ]);

    // Assign data globally (if needed)
    global.foodItems = foodItems;
    global.foodCategory = foodCategory;

    // console.log("Food Items:", global.foodItems);
    // console.log("Food Categories:", global.foodCategory);

    // Return the data if needed
    return { foodItems, foodCategory };
  } catch (err) {
    console.error("Error connecting to DB or fetching data:", err.message);
    throw err; // Throw the error to handle it in calling function
  }
};

module.exports = main;
