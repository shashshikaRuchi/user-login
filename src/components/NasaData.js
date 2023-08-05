import React, { useState, useEffect } from "react";
import axios from "axios";

const NasaData = () => {
  const [nasaData, setNasaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=WPkY0S1WluAVGRIZ713hkvDUpCQ2lKUHayL1sQYW`
        );
        setNasaData(response.data);
      } catch (error) {
        console.error("Error fetching NASA data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("nasadata", nasaData);
  return (
    <div>
      <h2>NASA Data</h2>
      {nasaData && (
        <div>
          <h4>{nasaData?.title}</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>copyright-{nasaData?.copyright}</h4>
            <h4>Date-{nasaData?.date}</h4>
            <h4>Version-{nasaData?.service_version}</h4>
          </div>
          <p>{nasaData?.explanation}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img width={"70%"} src={nasaData.url} alt={nasaData.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(NasaData);
