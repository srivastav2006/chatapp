import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Qs from "qs";
import { io } from "socket.io-client";
import "./HomePage.css";
import { useAuth } from "../Context/UserAuthContext";
import q from "../assets/light_svg.svg";
import s from "../assets/svg.svg";
import { Tilt } from "react-tilt";

const HomePage = ({ darkMode }) => {
  const socket = io("wss://reactchat-production-f378.up.railway.app/", {
    transports: ["websocket"],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    room: "",
  });

  const { setRoomDetail } = useAuth();

  useEffect(() => {
    const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
    if (room) {
      setFormData((prevData) => ({ ...prevData, room }));
    }
  }, [location.search]);

  // Timer function for clock
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, []);

  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", formData.username);
    localStorage.setItem("room", formData.room);
    setRoomDetail({ username: formData.username, room: formData.room });
    navigate(`chat?username=${formData.username}&room=${formData.room}`);
  };

  const defaultOptions = {
    reverse: false,
    max: 100,
    perspective: 1000,
    scale: 1.1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <div className="w-screen h-screen flex flex-col-reverse xl:flex-row lg:flex-row md:flex-row sm:flex-row relative">
      <div className="w-1/2 h-full flex justify-center items-center flex-col">
        <div className={`time-display p-2 rounded-full text-[1.5rem] font-semibold ${
              darkMode ? "text-white" : "text-customgrey"
            }`}> 
          {formatTime(currentTime)}
        </div>
        <div className="form xl:h-[35vw] xl:w-[35vw] lg:h-[35vw] lg:w-[35vw] p-[3px] bg-transparent">
          <h1
            className={`join text-[2.5rem] flex justify-center items-center mb-12 font-semibold ${
              darkMode ? "text-white" : "text-customgrey"
            }`}
          >
            CHAT APP
          </h1>
          <form onSubmit={handleSubmit} className="input w-full h-full">
            <label
              className={`text-[1.1rem] font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Your Name/Nick Name
            </label>

            <input
              className={`mb-10 w-full p-[10px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-transparent text-2xl ${
                darkMode ? "text-white" : "text-black"
              }`}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label
              className={`text-[1.1rem] font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
            Channel Id
            </label>
            <input
              className={`mb-12 w-full p-[10px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-transparent text-3xl ${
                darkMode ? "text-white" : "text-black"
              }`}
              type="text"
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className={`w-[100%] cursor-pointer p-[20px] border-none text-2xl font-bold transition duration-300 ease-in-out hover:bg-[#4de03a] disabled:cursor-default disabled:bg-[#7c5cbf94] rounded-lg ${
                darkMode ? "bg-[#88f231] text-black" : "bg-[#88f231] text-white"
              }`}
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>

      <div className="img w-1/2 flex justify-center items-center" style={{ paddingRight: "3vw" }}>
        <Tilt options={defaultOptions}>
          <img
            className="image-class"
            src={darkMode ? s : q}
            alt="svgimage not found"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Tilt>
      </div>
    </div>
  );
};

export default HomePage;