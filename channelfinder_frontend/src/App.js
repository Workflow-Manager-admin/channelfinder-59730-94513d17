import React from 'react';
import './App.css';
import ChannelFinderContainer from './ChannelFinderContainer';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" disabled>
              Channel Finder
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ paddingTop: 108, paddingBottom: 48, minHeight: "75vh" }}>
          <div className="hero" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="subtitle" style={{ color: '#1a73e8', marginBottom: '9px', fontSize: '1.21rem' }}>
              Channel Finder
            </div>
            <h1 className="title" style={{ fontSize: '2.35rem', color: '#222', margin: 0, fontWeight: 700 }}>
              Find YouTube Channels Instantly
            </h1>
            <div className="description" style={{ color: '#686868', marginTop: '8px', marginBottom: '24px' }}>
              Search for YouTube channels by name and view channel stats, descriptions, and more.
            </div>
            <ChannelFinderContainer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;