import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const MySwal = withReactContent(Swal);

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
        setTimeout(() => setIsError(false), 3000);
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
      return (
        <div
          className="alert alert-danger alert-dismissible.fade.show"
          role="alert"
        >
          Unable to get Gifs. Please try again in a few minutes.
        </div>
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setTimeout(() => setIsError(false), 1500);
    setIsLoading(true);

    if (search.length === 0) {
      MySwal.fire({
        icon: "error",
        title: "Oops... ",
        text: "Your search field is empty!",
      });
      setIsLoading("");
      return;
    }

    const searchResults = await axios("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "6FWRNXMBWZPPWKYVnN9kcDAd9xjiue1x",
        q: search,
      },
    });
    setData(searchResults.data.data);
    setIsLoading(false);
  };

  return (
    <div className="m-2">
      {renderError()}
      <div className="d-flex justify-content-center">
        <form>
          <input
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search here..."
            className="mt-2"
            // className="form-control"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary ms-2"
          >
            Search
          </button>
        </form>
      </div>
      <div className="container">{renderGifs()}</div>
    </div>
  );
};

export default Giphy;
