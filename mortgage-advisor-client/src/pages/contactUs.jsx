import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Function to fetch data from server using axios
    const fetchData = async () => {
      try {
        // Make a GET request to the server using axios
        const response = await axios.get("http://localhost:3001/test");
        setMessage(response.data.message); // Access data directly from axios response
      } catch (error) {
        console.error("Error fetching data: ", error);
        setMessage("Failed to connect to server");
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount
  // Empty array means this effect runs once on mount

  return (
    <div>
      <p>Server says: {message}</p>
    </div>
  );
};

export default ContactUs;
