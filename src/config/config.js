const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://127.0.0.1:8000"
  : "https://natuur-game.onrender.com";

export default API_BASE_URL;