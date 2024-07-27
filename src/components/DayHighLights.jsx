import React from "react";
import "./DayHighLights.css";

const getMoonPhaseEntity = (phase) => {
  if (phase < 0.05 || phase > 0.95) {
    return <p>&#x1F311; New Moon</p>; // New Moon
  } else if (phase < 0.25) {
    return <p>&#x1F312; Waxing Crescent</p>; // Waxing Crescent
  } else if (phase < 0.45) {
    return <p>&#x1F313; First Quarter</p>; // First Quarter
  } else if (phase < 0.55) {
    return <p>&#x1F314; Waxing Gibbous</p>; // Waxing Gibbous
  } else if (phase < 0.75) {
    return <p>&#x1F315; Full Moon</p>; // Full Moon
  } else if (phase < 0.95) {
    return <p>&#x1F316; Waning Gibbous</p>; // Waning Gibbous
  } else {
    return <p>&#x1F317; Last Quarter</p>; // Last Quarter
  }
};

const moonPhases = [
  { label: "New Moon", entity: "&#x1F311;", phase: 0.0 },
  { label: "Waxing Crescent", entity: "&#x1F312;", phase: 0.1 },
  { label: "First Quarter", entity: "&#x1F313;", phase: 0.25 },
  { label: "Waxing Gibbous", entity: "&#x1F314;", phase: 0.35 },
  { label: "Full Moon", entity: "&#x1F315;", phase: 0.5 },
  { label: "Waning Gibbous", entity: "&#x1F316;", phase: 0.65 },
  { label: "Last Quarter", entity: "&#x1F317;", phase: 0.75 },
  { label: "Waning Crescent", entity: "&#x1F318;", phase: 0.85 },
];

function DayHighLights({ data }) {
  const currentPhase = data.moon_phase;

  const getHighlightedPhaseIndex = () => {
    for (let i = 0; i < moonPhases.length; i++) {
      if (moonPhases[i].phase >= currentPhase) {
        return i;
      }
    }
    return moonPhases.length - 1; // Default to the last phase if no match
  };

  const highlightedIndex = getHighlightedPhaseIndex();
  return (
    <div className="container-fluid px-5 text-left day__details">
      <h5>Day Details</h5>
      <span className="span-col">
        <div className="col col-border-topped">
          <h5>Day</h5>
          <p className="description">
            There will be mostly {data.weather.description.toLowerCase()}. The
            high will be {Math.round(data.max_temp)} &deg;
          </p>
          <h5 className="mt-4">Night</h5>
          <p className="description">
            The skies will be {data.weather.description.toLowerCase()}. The low
            will be {Math.round(data.min_temp)} &deg;
          </p>
        </div>
        <div className="col col-border-topped">
          <h5>Sunrise</h5>
          <p className="day__timings">
            &nbsp; &#x2600;&nbsp;
            {new Date(data.sunrise_ts * 1000).toLocaleTimeString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <h5>Sunset</h5>
          <p className="day__timings">
            &nbsp; &#x1F307;&nbsp;
            {new Date(data.sunset_ts * 1000).toLocaleTimeString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="col col-border-topped">
          <h5>Moonrise</h5>
          <p className="day__timings">
            &nbsp; &#x1F311;&nbsp;
            {new Date(data.moonrise_ts * 1000).toLocaleTimeString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <h5>Moonset</h5>
          <p className="day__timings">
            &nbsp; &#x1F312;&nbsp;
            {new Date(data.moonset_ts * 1000).toLocaleTimeString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <h5>Moon Phase</h5>
          {/* <div className="day__timings moon_phase">
            {moonPhases.map((moonPhase, index) => (
              <div
                key={index}
                className={`moon-phase ${
                  index === highlightedIndex ? "highlighted" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: moonPhase.entity }}
              >
                <div>{moonPhase.label}</div>
              </div>
            ))}
          </div> */}
          {getMoonPhaseEntity(data.moon_phase)}
        </div>
        <div className="col col-border-topped">
          <div className="flex-widget">
            <span>
              <h5>Precipitation</h5>
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: " 100px",
                }}
              >
                <svg
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <circle
                    cx="45"
                    cy="45"
                    r="40"
                    style={{
                      width: "100px",
                      height: "100px",
                      fill: "transparent",
                      strokeWidth: "6",

                      transform: "translate(5px, 5px)",
                      strokeDasharray: "290",

                      strokeDashoffset: 0,
                      stroke: "rgba(255, 255, 255, 0.6)",
                    }}
                  ></circle>
                  <circle
                    cx="45"
                    cy="45"
                    r="40"
                    style={{
                      width: "100px",
                      height: "100px",
                      fill: "transparent",
                      strokeWidth: "6",

                      transform: "translate(5px, 5px)",
                      strokeDasharray: "290",

                      strokeDashoffset: `calc(290 - (250 * ${data.precip}) / 100)`,
                      stroke: "rgba(0, 191, 255, 0.6)",
                    }}
                  ></circle>
                </svg>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                    textAlign: "center",
                    fontSize: "14px !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    position: "absolute",
                  }}
                >
                  <div>
                    {Math.round(data.precip)}&nbsp;
                    <span style={{ fontSize: "13px" }}>%</span>
                  </div>
                </div>
              </div>
            </span>
            <span>
              <h5>Humidity</h5>
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: " 100px",
                }}
              >
                <svg
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <circle
                    cx="45"
                    cy="45"
                    r="40"
                    style={{
                      width: "100px",
                      height: "100px",
                      fill: "transparent",
                      strokeWidth: "6",

                      transform: "translate(5px, 5px)",
                      strokeDasharray: "290",

                      strokeDashoffset: 0,
                      stroke: "rgba(255, 255, 255, 0.6)",
                    }}
                  ></circle>
                  <circle
                    cx="45"
                    cy="45"
                    r="40"
                    style={{
                      width: "100px",
                      height: "100px",
                      fill: "transparent",
                      strokeWidth: "6",

                      transform: "translate(5px, 5px)",
                      strokeDasharray: "290",

                      strokeDashoffset: `calc(290 - (250 * ${data.rh}) / 100)`,
                      stroke: "rgba(0, 191, 255, 0.6)",
                    }}
                  ></circle>
                </svg>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                    textAlign: "center",
                    fontSize: "14px !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    position: "absolute",
                  }}
                >
                  <div>
                    {data.rh} <span style={{ fontSize: "13px" }}>%</span>
                  </div>
                </div>
              </div>
            </span>
          </div>
          <div className="flex-widget">
            <span>
              <h5>UV Index</h5>
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: " 100px",
                }}
              >
                <svg
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <circle
                    cx="45"
                    cy="45"
                    r="40"
                    style={{
                      width: "100px",
                      height: "100px",
                      fill: "transparent",
                      strokeWidth: "6",

                      transform: "translate(5px, 5px)",
                      strokeDasharray: "290",
                      strokeDashoffset: 0,
                      stroke: "rgba(255, 255, 255, 0.6)",
                    }}
                  ></circle>
                  <circle
                    cx="45"
                    cy="45"
                    r="40"
                    style={{
                      width: "100px",
                      height: "100px",
                      fill: "transparent",
                      strokeWidth: "6",

                      transform: "translate(5px, 5px)",
                      strokeDasharray: "290",

                      strokeDashoffset: `calc(290 - (250 * ${data.uv}))`,
                      stroke: "rgba(0, 191, 255, 0.6)",
                    }}
                  ></circle>
                </svg>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                    textAlign: "center",
                    fontSize: "14px !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    position: "absolute",
                  }}
                >
                  <div>
                    {data.uv * 10} <br />
                    <span style={{ fontSize: "13px" }}>
                      {data.uv <= 2 && data.uv >= 0
                        ? "Low"
                        : data.uv <= 5 && data.uv >= 3
                        ? "Moderate"
                        : data.uv <= 7 && data.uv >= 6
                        ? "High"
                        : data.uv <= 10 && data.uv >= 8
                        ? "Very High"
                        : "Extreme"}
                    </span>
                  </div>
                </div>
              </div>
            </span>

            <span>
              <h5>Max Wind</h5>
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: " 100px",
                }}
              >
                <svg
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <circle
                    cx="45"
                    cy="45"
                    r="40"
                    style={{
                      width: "100px",
                      height: "100px",
                      fill: "transparent",
                      strokeWidth: "6",
                      transform: "translate(5px, 5px)",
                      strokeDasharray: "290",
                      strokeDashoffset: 0,
                      stroke: "rgba(255, 255, 255, 0.6)",
                    }}
                  ></circle>
                  <circle
                    cx="45"
                    cy="45"
                    r="40"
                    style={{
                      width: "100px",
                      height: "100px",
                      fill: "transparent",
                      strokeWidth: "6",

                      transform: "translate(5px, 5px)",

                      strokeDashoffset: `calc(290 - (250 * ${data.wind_spd}*3.6) / 100)`,
                      stroke: "rgba(0, 191, 255, 0.6)",
                    }}
                  ></circle>
                </svg>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                    textAlign: "center",
                    fontSize: "14px !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    position: "absolute",
                  }}
                >
                  <div>
                    {Math.round(data.wind_spd * 3.6)} <br />
                    <span style={{ fontSize: "13px" }}>Km/h</span>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </span>
      <span className="span-col">
        <div className="col col-border-topped">
          <div></div>
        </div>
      </span>
    </div>
  );
}

export default DayHighLights;
