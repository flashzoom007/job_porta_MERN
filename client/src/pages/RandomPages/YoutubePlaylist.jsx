import React, { useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";

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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/playlist-download`,
        { playlistUrl }
      );

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
    <div className="contact-us-container">
      <div className="form-section">
        <div className="form-content text-align-center">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            🎥 YouTube Playlist Downloader
          </h1> 
          <p className="text-gray-600 text-center mb-6">
            Enter a YouTube Playlist URL and download all videos.
          </p>

          <span className="d-flex justify-content-center mb-4 gap-3">
            <input
              type="text"
              placeholder="Enter YouTube Playlist URL"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              className="form-control"
            />
            <button
              className="btn btn-outline-primary w-25"
              onClick={handleDownload}
            >
              <FaDownload /> Download
            </button>
          </span>

          {status && (
            <p
              className={`mt-4 text-center font-medium ${status.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
