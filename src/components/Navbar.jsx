import React, { useState } from "react";
import "./Navbar.css";
function Navbar({ getCityName, handleStyling, handleReload, location }) {
  const [city, setCity] = useState("");
  const [isDay, setIsDay] = useState(false);
  const [enableReload, setEnableReload] = useState(false);

  const handleIsDay = () => {
    setIsDay(!isDay);
  };

  const reload = () => {
    setEnableReload(!enableReload);
  };
  const handleSearchField = (event) => {
    setCity(event.target.value);
  };

  const saveCity = () => {
    localStorage.setItem("city", location);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark top__nav">
      <div className="container">
        <a className="navbar-brand" href="/">
          WeatherApp.AI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <div className="nav-flexbar"> */}
          <ul className="navbar-nav ml-auto text-light">
            <li className="nav-item mr-4">
              <button
                className="bg-transparent border-0 text-light customButton"
                onClick={function () {
                  reload();
                  handleReload(enableReload);
                }}
              >
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </button>
            </li>
            <li className="nav-item mr-4">
              <button
                className="bg-transparent border-0 text-light customButton"
                onClick={saveCity}
              >
                <i className="fa fa-star" aria-hidden="true"></i>
              </button>
            </li>
            <li className="nav-item mr-4">
              <button className="bg-transparent border-0 text-light customButton">
                <i className="fa fa-thumb-tack" aria-hidden="true"></i>
              </button>
            </li>
            <li className="nav-item mr-4">
              <button
                className="bg-transparent border-0 text-light customButton"
                onClick={function (event) {
                  handleIsDay();
                  handleStyling(isDay);
                }}
              >
                <i
                  className={`fa fa-${isDay ? "sun" : "moon"}`}
                  aria-hidden="true"
                ></i>
              </button>
            </li>
            <li>
              <div className="search__area">
                <input
                  className="search__field"
                  type="search"
                  placeholder="Search..."
                  onChange={handleSearchField}
                  aria-label="Search"
                />
                <span
                  className="search__button"
                  onClick={() => getCityName(city)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>
            </li>
          </ul>

          {/* </div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
