import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Luggage } from "@mui/icons-material";
import { useInput } from "../hooks/useInput";
import axios from "axios";

function BookingForm() {
  const [roomType, setRoomType] = useState("");
  const [name, handleName, nameError] = useInput("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!name || !roomType || !checkInDate || !checkOutDate) {
      setError(true);
      return;
    } else {
      try {
        setError(false);
        const postData = {
          name,
          roomType,
          checkInDate: checkInDate.toString(),
          checkOutDate: checkOutDate.toString(),
        };

        const {data} = await axios.post('http://localhost:3000/bookings',postData);

        if(data){
          alert('Room is added to Queue');
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "40%",
        borderRight: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      component={"section"}
    >
      <Box sx={{ width: "75%" }}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Please Fill all details</AlertTitle>
          </Alert>
        )}
        <h2 style={{ fontSize: "32px", fontWeight: 700, margin: "10px 0" }}>
          Room Booking
        </h2>
        <Box component={"form"} onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Name"
            error={nameError}
            onChange={handleName}
            helperText={nameError ? "Please Enter Name" : null}
            sx={{ width: "100%", margin: "10px 0" }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={roomType}
              label="Room Type"
              onChange={(e) => setRoomType(e.target.value)}
            >
              <MenuItem value={"Regular"}>Regular</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Large"}>Large</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%", margin: "10px 0" }}
              label="Check In Date"
              onChange={(value) => setCheckInDate(value.$d)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%", margin: "10px 0" }}
              label="Check Out Date"
              onChange={(value) => setCheckOutDate(value.$d)}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            startIcon={<Luggage />}
            onClick={handleSubmit}
          >
            Confirm Booking
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default BookingForm;
