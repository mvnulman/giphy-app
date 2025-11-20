import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const GIPHY_API_KEY =
  process.env.REACT_APP_GIPHY_API_KEY || "6FWRNXMBWZPPWKYVnN9kcDAd9xjiue1x";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const MySwal = withReactContent(Swal);
  const [darkMode, setDarkMode] = useState(true);

  const applyTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    } else {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        setDarkMode(true);
        applyTheme(true);
      } else if (saved === "light") {
        setDarkMode(false);
        applyTheme(false);
      } else {
        setDarkMode(true);
        applyTheme(true);
      }
    } catch (e) {
      console.error("Error accessing localStorage for theme:", e);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      localStorage.setItem("theme", newMode ? "dark" : "light");
    } catch (e) {
      // ignore
    }
    applyTheme(newMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: GIPHY_API_KEY,
            limit: 25,
          },
        });
        setData(results.data.data || []);
      } catch (error) {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return (
        <div className="text-center" style={{ marginTop: 100 }}>
          <Spinner
            style={{ width: "75px", height: "75px" }}
            animation="border"
            role="status"
            variant="light"
          />
        </div>
      );
    }
    return (
      <>
        {data.map((gif) => (
          <div key={gif.id} className="gif">
            <img src={gif.images.fixed_width.url} alt={gif.title || "gif"} />
          </div>
        ))}
      </>
    );
  };

  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs. Please try again in a few minutes.
        </div>
      );
    }
    return null;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);

    if (search.trim().length === 0) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "The search field is empty!",
      });
      setIsLoading(false);
      return;
    }

    try {
      const searchResults = await axios(
        "https://api.giphy.com/v1/gifs/search",
        {
          params: {
            api_key: GIPHY_API_KEY,
            q: search,
            limit: 25,
          },
        }
      );
      setData(searchResults.data.data || []);
    } catch (error) {
      setIsError(true);
      MySwal.fire({
        icon: "error",
        title: "Search failed",
        text: "Could not fetch GIFs. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-4">
      {renderError()}
      <div className="search-bar d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search here..."
            className="search-input"
            aria-label="Search gifs"
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <FiSearch size={18} />
          </button>
        </form>
        <button
          type="button"
          onClick={toggleDarkMode}
          className="theme-btn"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>
      </div>
      <div className="container">{renderGifs()}</div>
    </div>
  );
};

export default Giphy;
