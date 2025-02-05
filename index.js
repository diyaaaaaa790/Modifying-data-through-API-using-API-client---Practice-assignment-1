const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.listen(3000, () => console.log("Server running on port 3000"));

const MenuItem = require("./models/MenuItem");

app.post("/menu", async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !price) return res.status(400).json({ error: "Name and price are required" });

        const newItem = new MenuItem({ name, description, price });
        await newItem.save();
        res.status(201).json({ message: "Menu item added successfully", data: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/menu", async (req, res) => {
  try {
      const items = await MenuItem.find();
      res.json(items);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

