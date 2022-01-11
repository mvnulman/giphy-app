import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "6FWRNXMBWZPPWKYVnN9kcDAd9xjiue1x",
          limit: 25,
        },
      });

      console.log(results);
      setData(results.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return (
        <Spinner style={{width:"75px", height:"75px", marginTop:"100px"}}animation="border" role="status" variant="light">
        </Spinner>
      );
    }
    return data.map((gif) => {
      return (
        <div key={gif.id} className="gif">
          <img src={gif.images.original.url} alt="gif" />
        </div>
      );
    });
  };

  return <div className="container">{renderGifs()}</div>;
};

export default Giphy;
