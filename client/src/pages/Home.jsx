import React, { useState } from "react";
import axios from "axios";


const Home = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    if (!playlistUrl) {
      setStatus("❌ Please enter a playlist URL!");
      return;
    }

    setStatus("⏳ Downloading... Please wait!");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/playlist-download`, {
        playlistUrl,
      });

      if (response.data.message) {
        setStatus(`✅ Download complete! Total Videos: ${response.data.totalVideos}`);
      } else {
        setStatus(`❌ Error: ${response.data.error}`);
      }
    } catch (error) {
      setStatus("❌ Failed to download videos!");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter YouTube Playlist URL"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        style={{ padding: "10px", width: "300px", fontSize: "16px" }}
      />
      <br />
      <button className="btn btn-outline-primary"
        onClick={handleDownload}>
        Download
      </button>
      <p>{status}</p>
    </div>
  );
};

export default Home;