import { Box } from "@mui/material";
import BookingForm from "../components/BookingForm";
import ReadyQueue from "../components/ReadyQueue";

function Home() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <BookingForm />
      <Box
        sx={{
          width: "60%",
        }}
      >
        <ReadyQueue />
      </Box>
    </Box>
  );
}

export default Home;
