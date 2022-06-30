import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPosition, fetchPosts } from "./redux/positionSlice";
import { motion, AnimatePresence } from "framer-motion";
import "./app.scss";
import cwindow from "./assets/cwindow.png";
import owindow from "./assets/owindow.png";

function App() {
  const { longitude, latitude } = useSelector(
    (state) => state.position.currentPosition
  );
  const weatherData = useSelector((state) => state.position.postcontent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const getCurrentLocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let location = { latitude, longitude };
        dispatch(currentPosition(location));
        dispatch(fetchPosts(location));
      });
    }
  };

  return (
    <div className="app">
      <h1>I don't have a window</h1>
      <p>please tell me, what is the weather outside...</p>
      <div className="app__position">
        {weatherData.name ? (
          <h2>
            Your current location:{" "}
            <strong>
              {weatherData.name}, {weatherData.sys.country}
            </strong>
          </h2>
        ) : (
          <h2>Press the button to open the window</h2>
        )}
        <h3>
          Current position:{" "}
          <strong>
            {longitude.toFixed(4)} long., {latitude.toFixed(4)} lat.
          </strong>
        </h3>

        <button onClick={() => getCurrentLocationData()}>
          Open the window
        </button>
        {Object.keys(weatherData).length ? (
          <div class="weather-container">
            <div className="images">
              <AnimatePresence>
                <motion.img
                  src={owindow}
                  id="open-window"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              </AnimatePresence>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                id="weather-icon"
              />
            </div>
            <div id="weather-data">
              <p>
                <strong>Conditions:</strong>{" "}
                {weatherData.weather[0].description}
              </p>
              <p>
                <strong>Temperature:</strong> {weatherData.main.temp.toFixed(0)}{" "}
                °C
              </p>
              <p>
                <strong>Min temperature:</strong>{" "}
                {weatherData.main.temp_min.toFixed(0)} °C
              </p>
              <p>
                <strong>Max temperature:</strong>{" "}
                {weatherData.main.temp_max.toFixed(0)} °C
              </p>
              <p>
                <strong>Feels like:</strong>{" "}
                {weatherData.main.feels_like.toFixed(0)} °C
              </p>
              <p>
                <strong>Pressure:</strong> {weatherData.main.pressure} hpa
              </p>
              <p>
                <strong>Humidity:</strong> {weatherData.main.humidity} %
              </p>
            </div>
          </div>
        ) : (
          <div className="images">
            <AnimatePresence>
              <motion.img
                src={cwindow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </AnimatePresence>
          </div>
        )}
        {console.log(weatherData)}
      </div>
    </div>
  );
}

export default App;
