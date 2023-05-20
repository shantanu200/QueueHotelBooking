import { Box } from "@mui/material";
import { useState } from "react";

function ReadyQueue() {
  const [queue,setQueue] = useState([]);
  return (
    <Box sx={{ padding: "1rem" }}>
      <h3
        style={{
          fontWeight: 700,
          fontSize: "24px",
        }}
      >
        Ready Queue
      </h3>
      {queue.length > 0 ? <Box></Box> : <Box>No Bookings present in Queue</Box>}
    </Box>
  );
}

export default ReadyQueue;
