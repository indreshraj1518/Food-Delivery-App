const express = require("express");
const app = express();
const port = 8080;
const mongoDb = require("./db");
// const orderData = require("./Routes/OrderData");

mongoDb();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  next();
});
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.listen(port, () => {
  console.log("app is listing on the port 8080");
});
