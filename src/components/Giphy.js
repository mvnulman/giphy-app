import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "6FWRNXMBWZPPWKYVnN9kcDAd9xjiue1x",
            limit: 25,
          },
        });

        console.log(results);
        setData(results.data.data);
      } catch (error) {
        setIsError(true);
        setTimeout(() => setIsError(false),
          3000);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return (
        <Spinner
          style={{ width: "75px", height: "75px", marginTop: "100px" }}
          animation="border"
          role="status"
          variant="light"
        ></Spinner>
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

  const renderError = () => {
    if (isError) {
      return <div className="alert alert-danger alert-dismissible.fade.show" role="alert">
      Unable to get Gifs. Please try again in a few minutes.
      {/* <button className="close">Close</button> */}
    </div>;
    }
  }

  return (
    <div className="m-2">
      {renderError()}
      <div className="container">{renderGifs()}</div>
    </div>
  );
};

export default Giphy;
