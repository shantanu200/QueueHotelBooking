import express from "express";
import mongoose from "mongoose";

// Connect to MongoDB
await mongoose.connect("mongodb://127.0.0.1/hotel_booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("Connected to MongoDB");

// Define hotel booking schema
const bookingSchema = new mongoose.Schema(
  {
    name: String,
    roomType: String,
    checkInDate: Date,
    checkOutDate: Date,
  },
  { timestamps: true }
);

// Create hotel booking model
const Booking = mongoose.model("Booking", bookingSchema);

// Create an instance of express
const app = express();
app.use(express.json());

// Create a queue for hotel bookings
const bookingQueue = [];

// POST route to add a new booking to the queue
app.post("/bookings", async (req, res) => {
  const { name, roomType, checkInDate, checkOutDate } = req.body;
  const newBooking = new Booking({
    name,
    roomType,
    checkInDate,
    checkOutDate,
  });
  await newBooking.save();

  bookingQueue.push(newBooking);
  res.send("Booking added to the queue");
});

// GET route to retrieve the next booking in the queue
app.get("/bookings/next", (req, res) => {
  if (bookingQueue.length > 0) {
    const nextBooking = bookingQueue.shift();
    res.json(nextBooking);
  } else {
    res.status(404).send("No bookings in the queue");
  }
});

app.get("/bookings/:id", async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).send("Booking not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.delete("/bookings/:id", async (req, res) => {
  const bookingId = req.params.id;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (deletedBooking) {
      // Remove the booking from the queue if present
      const index = bookingQueue.findIndex(
        (booking) => booking._id.toString() === bookingId
      );
      if (index !== -1) {
        bookingQueue.splice(index, 1);
      }
      res.send("Booking canceled successfully");
    } else {
      res.status(404).send("Booking not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
