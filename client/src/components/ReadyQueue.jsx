import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function ReadyQueue() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("http://localhost:3000/bookings/next");
      setQueue(data);
    }
    getData();
  }, []);

  console.log(queue);

  
  return (
    <Box sx={{ padding: "1rem" }}>
      <h3
        style={{
          fontWeight: 700,
          fontSize: "24px",
          borderBottom: "1px solid black",
          padding: "1rem 0",
        }}
      >
        Ready Queue
      </h3>
      {queue && queue?._id? (
        <Box>
        <span>Name: {queue?.name}</span>
        </Box>
      ) : (
        <Box sx={{ padding: "1rem 0" }}>No Bookings present in Queue</Box>
      )}
    </Box>
  );
}

export default ReadyQueue;
