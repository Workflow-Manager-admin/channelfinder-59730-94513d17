import React, { useState } from "react";

// PRIMARY: #1a73e8, ACCENT: #ff5722, SECONDARY: #ffffff
const YOUTUBE_API_KEY = "AIzaSyByHWpHYeLN9akvKuRB4l1PbKvQt1pGkao";
const YOUTUBE_API_SEARCH_URL =
  "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_CHANNEL_URL =
  "https://www.googleapis.com/youtube/v3/channels";

// PUBLIC_INTERFACE
function ChannelFinderContainer() {
  /**
   * Main container for ChannelFinder.
   * Provides YouTube channel search, data fetch, and responsive results display.
   */
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState("");

  // PUBLIC_INTERFACE
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setError("");
  };

  // PUBLIC_INTERFACE
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a channel name.");
      setChannels([]);
      return;
    }
    setLoading(true);
    setError("");
    setChannels([]);
    try {
      // Step 1: Search for channel IDs matching the query
      const searchParams = new URLSearchParams({
        part: "snippet",
        type: "channel",
        maxResults: 6,
        q: query,
        key: YOUTUBE_API_KEY,
      });
      const searchResponse = await fetch(
        `${YOUTUBE_API_SEARCH_URL}?${searchParams}`
      );
      if (!searchResponse.ok) {
        throw new Error("Search failed. Try again.");
      }
      const searchData = await searchResponse.json();
      const channelItems = searchData.items || [];
      if (channelItems.length === 0) {
        setChannels([]);
        setError("No channels found for your query.");
        setLoading(false);
        return;
      }

      // Step 2: Fetch channel details (stats/subs/pic) for found channel IDs
      const channelIds = channelItems.map((item) => item.snippet.channelId);
      const channelsParams = new URLSearchParams({
        part: "snippet,statistics",
        id: channelIds.join(","),
        key: YOUTUBE_API_KEY,
      });
      const channelsResponse = await fetch(
        `${YOUTUBE_API_CHANNEL_URL}?${channelsParams}`
      );
      if (!channelsResponse.ok) {
        throw new Error("Failed to get channel details.");
      }
      const channelsData = await channelsResponse.json();
      setChannels(channelsData.items || []);
    } catch (err) {
      setError(err.message || "An error occurred.");
      setChannels([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="cf-container"
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "32px 16px",
        boxShadow: "0 2px 12px rgba(26,115,232,0.11), 0 1.5px 5px rgba(0,0,0,0.08)",
        marginTop: 32,
        maxWidth: 640,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <form
        onSubmit={handleSearch}
        className="cf-searchbar"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "32px",
        }}
      >
        <input
          type="text"
          aria-label="search youtube channel"
          placeholder="Search for a YouTube channel"
          value={query}
          onChange={handleInputChange}
          style={{
            flex: 1,
            padding: "12px 16px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1.5px solid #d6d8df",
            outline: "none",
            minWidth: 0,
          }}
        />
        <button
          className="btn"
          type="submit"
          style={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "0 20px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: 500,
            minWidth: "90px",
            transition: "all 0.18s",
          }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && (
        <div
          style={{
            color: "#ff5722",
            background: "#fff6f0",
            border: "1px solid #ff5722",
            borderRadius: "5px",
            padding: "7px 14px",
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}
      <div className="cf-results">
        {channels.length > 0 && (
          <div>
            <h2
              style={{
                color: "#1a73e8",
                fontSize: "1.2rem",
                margin: "8px 0 12px 0",
              }}
            >
              Results
            </h2>
            <div
              className="cf-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {channels.map((channel) => (
                <a
                  key={channel.id}
                  href={`https://www.youtube.com/channel/${channel.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cf-channel-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: "18px 12px",
                    background: "#fafbff",
                    color: "#211e3c",
                    borderRadius: "7px",
                    boxShadow: "0 1.5px 8px 0 rgba(26,115,232,0.08)",
                    textDecoration: "none",
                    transition: "transform 0.1s, box-shadow 0.1s",
                  }}
                >
                  <img
                    src={
                      channel.snippet?.thumbnails?.medium?.url ||
                      channel.snippet?.thumbnails?.default?.url ||
                      ""
                    }
                    alt={channel.snippet?.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 12px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      background: "#e5e9f2",
                    }}
                  />
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      color: "#1a73e8",
                      marginBottom: 4,
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    {channel.snippet?.title || "No Title"}
                  </div>
                  <div
                    style={{
                      fontSize: "0.98rem",
                      marginBottom: 6,
                      textAlign: "center",
                      color: "#666",
                      minHeight: "30px",
                      maxHeight: "45px",
                      overflow: "hidden",
                    }}
                  >
                    {channel.snippet?.description
                      ? channel.snippet.description.length > 110
                        ? channel.snippet.description.slice(0, 110) + "..."
                        : channel.snippet.description
                      : "No description"}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#ff5722",
                      fontWeight: 500,
                      fontSize: "0.98rem",
                    }}
                  >
                    {channel.statistics?.subscriberCount
                      ? channel.statistics.subscriberCount.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        ) + " subscribers"
                      : "Subscriber count not available"}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChannelFinderContainer;
