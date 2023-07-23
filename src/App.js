import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "./weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Paris");
  const [bg, setbg] = useState(hotBg);
  // const [units, setunits] = useState("metric");
  // const [city, setCity] = useState("Paris");
  const [units, setunits] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      // console.log(data);
      setWeather(data);
      //dynamic background image
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setbg(coldBg);
      else setbg(hotBg);
    };
    fetchWeatherData();
  }, [units, city]);
  // const fetchWeatherData = async () => {
  //   const data = await getFormattedWeatherData(city, units);
  // };
  // fetchWeatherData();
  // const handleUnitsClick = (e) => {
  //   const button = e.currentTarget;
  //   const currentunit = button.innerText.slice(1);
  //   const isCelsius = currentunit === "C";
  //   button.innerText = isCelsius ? "℉" : "℃";
  //   setunits(isCelsius ? "metric" : "imperial");
  // };
  const handleUnitsClick = () => {
    setunits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  };
  const enterkeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterkeyPressed}
                type="text"
                name="city"
                placeholder="Enter City name.."
              />
              <button onClick={handleUnitsClick}>
                {units === "metric" ? "℉" : "℃"}
              </button>
              {/* <button onClick={(e) => handleUnitsClick(e)}>℉</button> */}
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>
                  {weather.name},{weather.country}
                </h3>
                <img src={weather.iconURL} alt="weatherIcon"></img>
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            {/* {bottom description} */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
