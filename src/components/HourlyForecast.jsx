import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import GraphPlot from "./GraphPlot";
import "./HourlyForecast.css";
import HourlyForeCastItem from "./HourlyForeCastItem";

const hourlySettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 9,
  slidesToScroll: 9,
};

function HourlyForecast(props) {
  const [resultSet, setResultSet] = useState(props.data);
  const [summaryButton, setSummaryStatus] = useState("");
  const [detailButton, setDetailButton] = useState("active");
  const [showGraph, setShowGraph] = useState(true);

  const handleOverview = (event) => {
    if (event.target.textContent.trim() === "Summary") {
      setSummaryStatus("active");
      setDetailButton("");
      setShowGraph(false);
    } else {
      setSummaryStatus("");
      setDetailButton("active");
      setShowGraph(true);
    }
  };

  return (
    <div className="container-fluid px-5">
      <div className="hourly__forecast">
        <span className="hourly__forecast__header">
          <h5>Hourly</h5>
          <span className="hourly__forecast__buttons">
            <button className={summaryButton} onClick={handleOverview}>
              Summary <i className="fa fa-bar-chart" aria-hidden="true"></i>
            </button>
            <button className={detailButton} onClick={handleOverview}>
              Details <i className="fa fa-file-alt"></i>
            </button>
          </span>
        </span>
        {showGraph ? (
          <Slider {...hourlySettings}>
            {resultSet.hourly.map((hourlyWeather, index) => {
              if (index >= 24) return null;
              return <HourlyForeCastItem key={index} data={hourlyWeather} />;
            })}
          </Slider>
        ) : (
          <GraphPlot data={resultSet} />
        )}
      </div>
    </div>
  );
}

export default HourlyForecast;
