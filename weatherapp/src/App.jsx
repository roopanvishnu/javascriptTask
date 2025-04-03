import React, { useState } from "react";
import Weather from "./pages/weatherapp.jsx";

function App() {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The form submission helps prevent unnecessary API calls
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "5px 10px", background: "#1E90FF", color: "white", border: "none" }}>
          Search
        </button>
      </form>
      <Weather city={city} />
    </div>
  );
}

export default App;