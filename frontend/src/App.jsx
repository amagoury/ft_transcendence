import { useMemo, useState } from "react";

const artwork = [
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
];

const tracks = [
  { title: "Midnight City", artist: "M83", genre: "Electronic", duration: "4:03", image: artwork[0] },
  { title: "Nangs", artist: "Tame Impala", genre: "Psychedelic", duration: "1:48", image: artwork[1] },
  { title: "Sunset Lover", artist: "Petit Biscuit", genre: "Chill", duration: "3:58", image: artwork[2] },
  { title: "After Dark", artist: "Mr.Kitty", genre: "Synthwave", duration: "4:19", image: artwork[3] },
  { title: "The Less I Know", artist: "Tame Impala", genre: "Alternative", duration: "3:36", image: artwork[4] },
  { title: "Space Song", artist: "Beach House", genre: "Dream pop", duration: "5:20", image: artwork[5] },
];

const Icon = ({ name, size = 19 }) => {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    library: <><path d="M4 5h2v14H4zM9 3h2v16H9zM14 5h2v14h-2zM19 4l2 1-4 14-2-.6Z" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
    play: <path fill="currentColor" stroke="none" d="m8 5 11 7-11 7V5Z" />,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    heart: <path d="M20.8 8.8c0 5.4-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
    upload: <><path d="M12 16V4M8 8l4-4 4 4M5 14v5h14v-5" /></>,
    users: <><path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 4.5a3 3 0 0 1 0 5.8M19 20v-1.5a4.5 4.5 0 0 0-3-4.2" /></>,
    chart: <><path d="M4 19V5M4 19h17" /><path d="m7 15 3-4 3 2 5-7" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

function App() {
  const [active, setActive] = useState("Home");
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [query, setQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => tracks.filter((track) =>
    `${track.title} ${track.artist} ${track.genre}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">◒</span> soundwave</div>
        <nav className="primary-nav">
          <NavItem icon="home" label="Home" active={active === "Home"} onClick={() => setActive("Home")} />
          <NavItem icon="compass" label="Discover" active={active === "Discover"} onClick={() => setActive("Discover")} />
          <NavItem icon="library" label="Your library" active={active === "Your library"} onClick={() => setActive("Your library")} />
          <NavItem icon="chart" label="Analytics" active={active === "Analytics"} onClick={() => setActive("Analytics")} />
        </nav>
        <div className="nav-label">Your playlists <button className="icon-button" onClick={() => notify("Playlist creator coming soon")}><Icon name="plus" size={17} /></button></div>
        <div className="playlist-links">
          <button onClick={() => notify("Opening Late Night Drive")}><span className="playlist-dot purple" />Late Night Drive</button>
          <button onClick={() => notify("Opening Focus Flow")}><span className="playlist-dot orange" />Focus Flow</button>
          <button onClick={() => notify("Opening Sunday Morning")}><span className="playlist-dot mint" />Sunday Morning</button>
        </div>
        <div className="sidebar-bottom">
          <button className="upload-link" onClick={() => setShowUpload(true)}><Icon name="upload" size={17} /> Upload music <span className="new-pill">NEW</span></button>
          <div className="profile-mini"><div className="avatar">AI</div><div><strong>Aisha</strong><span>Free account</span></div><Icon name="more" size={18} /></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="search-wrap"><Icon name="search" size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search artists, tracks, albums..." /><kbd>⌘ K</kbd></div>
          <button className="icon-button notification" onClick={() => notify("You’re all caught up")}><Icon name="bell" size={19} /><span /></button>
          <button className="upgrade-button" onClick={() => notify("Premium upgrade coming soon")}>Upgrade</button>
        </header>

        <div className="page-content">
          {active === "Analytics" ? <AnalyticsDashboard /> : <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">FRIDAY, SEPTEMBER 19</p>
              <h1>Good evening,<br /><em>Aisha.</em></h1>
              <p className="hero-sub">Your evening mix is ready. Pick up where you left off.</p>
              <button className="primary-button" onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={17} /> {playing ? "Pause mix" : "Play your mix"}</button>
            </div>
            <div className="hero-art">
              <div className="hero-disc" />
              <div className="hero-card"><img src={artwork[2]} alt="Sunset Lover cover" /><div><span>CONTINUE LISTENING</span><strong>Evening commute</strong><small>24 songs · 1h 42m</small></div><button onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={18} /></button></div>
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading"><div><h2>Made for you</h2><p>Based on your recent listening</p></div><button className="text-button" onClick={() => setActive("Discover")}>See all <span>→</span></button></div>
            <div className="recommend-grid">
              {tracks.slice(0, 4).map((track, index) => <article className="recommend-card" key={track.title} onClick={() => { setPlaying(true); notify(`Playing ${track.title}`); }}><div className="cover-wrap"><img src={track.image} alt="" /><button className="cover-play"><Icon name="play" size={16} /></button></div><strong>{["Your Daily Mix 1", "For your afternoon", "Low-key energy", "Night drive"][index]}</strong><span>{track.artist} · {track.genre}</span></article>)}
            </div>
          </section>

          <section className="section-block track-section">
            <div className="section-heading"><div><h2>Recently played</h2><p>Jump back into your favorites</p></div><button className="text-button" onClick={() => notify("All listening history loaded")}>View history <span>→</span></button></div>
            <div className="track-list">
              {filtered.length ? filtered.slice(0, 5).map((track, index) => <div className={`track-row ${index === 0 && playing ? "is-playing" : ""}`} key={track.title} onDoubleClick={() => { setPlaying(true); notify(`Playing ${track.title}`); }}><span className="track-number">{index === 0 && playing ? <Icon name="pause" size={14} /> : `0${index + 1}`}</span><img src={track.image} alt="" /><div className="track-info"><strong>{track.title}</strong><span>{track.artist}</span></div><span className="genre-tag">{track.genre}</span><span className="track-duration">{track.duration}</span><button className={`heart-button ${liked && index === 0 ? "liked" : ""}`} onClick={() => setLiked(!liked)}><Icon name="heart" size={17} /></button><button className="icon-button more-button" onClick={() => notify("More options opened")}><Icon name="more" size={18} /></button></div>) : <div className="empty-state">No tracks match “{query}”. Try another search.</div>}
            </div>
          </section>

          <section className="social-section"><div className="section-heading"><div><h2>Friends are listening</h2><p>See what your people have on repeat</p></div><button className="text-button" onClick={() => setActive("Discover")}>View friends <span>→</span></button></div><div className="friend-grid"><Friend name="Maya Chen" detail="Listening to Space Song" image={artwork[5]} online /><Friend name="Omar Ali" detail="Added Late Night Drive" image={artwork[3]} /><Friend name="Noura Said" detail="Listening to Sunset Lover" image={artwork[2]} online /></div></section>
          <section className="social-banner"><div className="social-icon"><Icon name="users" size={23} /></div><div><strong>Music is better together</strong><p>Follow friends and see what they’re listening to.</p></div><button className="outline-button" onClick={() => setActive("Discover")}>Find people</button></section>
          </>}
        </div>
      </main>

      <footer className="player-bar">
        <div className="now-playing"><img src={artwork[2]} alt="" /><div><strong>Sunset Lover</strong><span>Petit Biscuit</span></div><button className={`heart-button ${liked ? "liked" : ""}`} onClick={() => setLiked(!liked)}><Icon name="heart" size={17} /></button></div>
        <div className="player-controls"><div className="control-buttons"><button><Icon name="more" size={17} /></button><button className="main-play" onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={17} /></button><button><Icon name="more" size={17} /></button></div><div className="progress"><span>1:24</span><div className="progress-line"><i /></div><span>3:58</span></div></div>
        <div className="player-extra"><span>♫</span><div className="volume-line"><i /></div><span>⌗</span></div>
      </footer>

      {showUpload && <div className="modal-backdrop" onClick={() => setShowUpload(false)}><div className="upload-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowUpload(false)}>×</button><div className="upload-icon"><Icon name="upload" size={25} /></div><h2>Upload your music</h2><p>Share your sound with the Soundwave community.</p><label className="drop-zone"><input type="file" accept="audio/*" onChange={(e) => e.target.files?.[0] && notify(`${e.target.files[0].name} selected`)} /><span>Drop audio files here</span><small>MP3, WAV or FLAC · max 100 MB</small><b>Browse files</b></label><button className="primary-button full" onClick={() => { setShowUpload(false); notify("Upload queued"); }}>Continue</button></div></div>}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}><Icon name={icon} />{label}{active && <span className="active-bar" />}</button>;
}

function Friend({ name, detail, image, online }) {
  return <button className="friend-card"><span className="friend-avatar"><img src={image} alt="" />{online && <i />}</span><span><strong>{name}</strong><small>{detail}</small></span><Icon name="more" size={17} /></button>;
}

function AnalyticsDashboard() {
  const bars = [35, 52, 44, 68, 57, 79, 92, 63, 74, 50, 84, 96];
  return <section className="analytics-page"><div className="analytics-heading"><div><p className="eyebrow">YOUR LISTENING, THIS MONTH</p><h1>Aisha's <em>sound profile.</em></h1><p>Small patterns in your listening, beautifully summarized.</p></div><button className="outline-button">September 2026⌄</button></div><div className="metric-grid"><Metric value="42h 18m" label="Listening time" change="+18% vs last month" /><Metric value="128" label="Tracks played" change="+24 new discoveries" /><Metric value="34" label="Artists explored" change="7 from your library" /><Metric value="76%" label="Mood: mellow" change="Your top vibe" /></div><div className="analytics-grid"><div className="chart-card"><div className="card-heading"><div><h2>Listening activity</h2><p>Minutes listened over the last 12 weeks</p></div><span className="chart-legend"><i /> Minutes</span></div><div className="bar-chart">{bars.map((height, index) => <div className="bar-column" key={index}><i style={{ height: `${height}%` }} /><span>{["Jun 29", "", "Jul 13", "", "Jul 27", "", "Aug 10", "", "Aug 24", "", "Sep 7", ""][index]}</span></div>)}</div></div><div className="chart-card top-artists"><div className="card-heading"><div><h2>Top artists</h2><p>Your most-played this month</p></div></div>{tracks.slice(0, 4).map((track, index) => <div className="artist-row" key={track.artist}><b>0{index + 1}</b><img src={track.image} alt="" /><span><strong>{track.artist}</strong><small>{[18, 14, 11, 9][index]} plays</small></span><em>{["34%", "26%", "20%", "12%"][index]}</em></div>)}</div></div><div className="insight-card"><span className="insight-spark">✦</span><div><strong>Your taste is expanding</strong><p>You listened to 9 new artists this month. Keep exploring — your discovery rate is up 32%.</p></div><button className="outline-button">Explore recommendations</button></div></section>;
}

function Metric({ value, label, change }) {
  return <div className="metric-card"><strong>{value}</strong><span>{label}</span><small>{change}</small></div>;
}

export default App;
