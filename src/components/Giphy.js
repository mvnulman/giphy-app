import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Giphy = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "6FWRNXMBWZPPWKYVnN9kcDAd9xjiue1x",
        },
      });

      console.log(results);
      setData(results.data.data);
    };
    fetchData();
  }, []);



  const renderGifs = () => {
    return data.map(gif => {
      return (
        <div key={gif.id} className="gif">
          <img src={gif.images.original.url} alt="gif" />
        </div>
      );
    });
  }

  return (
    <div className="container">
      {renderGifs()}
    </div>
  );
};

export default Giphy;
