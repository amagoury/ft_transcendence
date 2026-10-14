import { useCallback, useEffect, useRef, useState } from "react";

const WIDTH = 960;
const HEIGHT = 540;
const PADDLE_H = 100;
const PADDLE_W = 12;
const BALL_R = 9;
const WIN_SCORE = 7;
const initialState = () => ({ leftY: HEIGHT / 2 - PADDLE_H / 2, rightY: HEIGHT / 2 - PADDLE_H / 2, ballX: WIDTH / 2, ballY: HEIGHT / 2, ballVX: 5, ballVY: 2.5, leftScore: 0, rightScore: 0 });

function App() {
  const canvasRef = useRef(null);
  const gameRef = useRef(initialState());
  const keysRef = useRef(new Set());
  const [mode, setMode] = useState("solo");
  const [status, setStatus] = useState("ready");
  const [scores, setScores] = useState({ left: 0, right: 0 });
  const [touching, setTouching] = useState(null);

  const reset = useCallback(() => {
    gameRef.current = initialState();
    setScores({ left: 0, right: 0 });
    setStatus("ready");
  }, []);

  const start = useCallback(() => {
    if (status === "finished") {
      gameRef.current = initialState();
      setScores({ left: 0, right: 0 });
    }
    setStatus("playing");
  }, [status]);

  useEffect(() => {
    const down = (event) => {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "w", "s", " "].includes(key)) event.preventDefault();
      keysRef.current.add(key);
      if (key === " " && event.repeat === false) setStatus((value) => value === "playing" ? "paused" : value === "paused" || value === "ready" ? "playing" : value);
    };
    const up = (event) => keysRef.current.delete(event.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    let frame;
    let last = 0;
    let scoreTick = 0;
    const render = (time) => {
      const g = gameRef.current;
      const dt = Math.min((time - (last || time)) / 16.67, 2);
      last = time;
      if (status === "playing") {
        if (keysRef.current.has("w") || touching === "left-up") g.leftY -= 7 * dt;
        if (keysRef.current.has("s") || touching === "left-down") g.leftY += 7 * dt;
        if (mode === "local") {
          if (keysRef.current.has("arrowup") || touching === "right-up") g.rightY -= 7 * dt;
          if (keysRef.current.has("arrowdown") || touching === "right-down") g.rightY += 7 * dt;
        } else {
          const target = g.ballY - PADDLE_H / 2;
          g.rightY += Math.max(-4.8 * dt, Math.min(4.8 * dt, target - g.rightY));
        }
        g.leftY = Math.max(0, Math.min(HEIGHT - PADDLE_H, g.leftY));
        g.rightY = Math.max(0, Math.min(HEIGHT - PADDLE_H, g.rightY));
        g.ballX += g.ballVX * dt;
        g.ballY += g.ballVY * dt;
        if (g.ballY < BALL_R || g.ballY > HEIGHT - BALL_R) { g.ballVY *= -1; g.ballY = Math.max(BALL_R, Math.min(HEIGHT - BALL_R, g.ballY)); }
        if (g.ballVX < 0 && g.ballX - BALL_R < 36 + PADDLE_W && g.ballY > g.leftY && g.ballY < g.leftY + PADDLE_H) {
          const hit = (g.ballY - (g.leftY + PADDLE_H / 2)) / (PADDLE_H / 2);
          const speed = Math.min(Math.hypot(g.ballVX, g.ballVY) * 1.045, 10);
          g.ballVX = speed * Math.cos(hit * 0.72);
          g.ballVY = speed * Math.sin(hit * 0.72);
          g.ballX = 36 + PADDLE_W + BALL_R;
        } else if (g.ballVX > 0 && g.ballX + BALL_R > WIDTH - 36 - PADDLE_W && g.ballY > g.rightY && g.ballY < g.rightY + PADDLE_H) {
          const hit = (g.ballY - (g.rightY + PADDLE_H / 2)) / (PADDLE_H / 2);
          const speed = Math.min(Math.hypot(g.ballVX, g.ballVY) * 1.045, 10);
          g.ballVX = -speed * Math.cos(hit * 0.72);
          g.ballVY = speed * Math.sin(hit * 0.72);
          g.ballX = WIDTH - 36 - PADDLE_W - BALL_R;
        }
        if (g.ballX < 0 || g.ballX > WIDTH) {
          if (g.ballX < 0) g.rightScore++; else g.leftScore++;
          g.ballX = WIDTH / 2; g.ballY = HEIGHT / 2;
          g.ballVX = (g.leftScore + g.rightScore) % 2 ? -5 : 5; g.ballVY = Math.random() * 4 - 2;
          if (g.leftScore >= WIN_SCORE || g.rightScore >= WIN_SCORE) setStatus("finished");
          if (time - scoreTick > 250) { setScores({ left: g.leftScore, right: g.rightScore }); scoreTick = time; }
        }
      }
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#101b2a"; ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.setLineDash([9, 13]); ctx.strokeStyle = "rgba(157,178,205,.22)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(WIDTH / 2, 0); ctx.lineTo(WIDTH / 2, HEIGHT); ctx.stroke(); ctx.setLineDash([]);
      ctx.shadowColor = "#64e4c1"; ctx.shadowBlur = 18; ctx.fillStyle = "#64e4c1"; ctx.beginPath(); ctx.roundRect(36, g.leftY, PADDLE_W, PADDLE_H, 6); ctx.fill();
      ctx.shadowColor = "#a895ff"; ctx.fillStyle = "#a895ff"; ctx.beginPath(); ctx.roundRect(WIDTH - 36 - PADDLE_W, g.rightY, PADDLE_W, PADDLE_H, 6); ctx.fill();
      ctx.shadowColor = "#fff"; ctx.shadowBlur = 20; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(g.ballX, g.ballY, BALL_R, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [mode, status, touching]);

  const hold = (direction) => (event) => { event.preventDefault(); setTouching(direction); };
  const release = () => setTouching(null);

  return (
    <main className="page-shell">
      <header className="topbar"><a className="brand" href="#home" aria-label="Pong home"><span className="brand-mark">P</span><span>COURT<span className="brand-light">SIDE</span></span></a><span className="topbar-label"><span className="live-dot" /> ARCADE · NO. 01</span></header>
      <section className="game-layout" aria-label="Pong game">
        <div className="eyebrow">THE ORIGINAL. REIMAGINED.</div>
        <div className="title-row"><div><h1>Make it <span>count.</span></h1><p className="subtitle">A little focus. A little finesse. First to seven.</p></div><div className="round-indicator"><span>BEST OF</span><strong>07</strong></div></div>
        <div className="mode-row" role="group" aria-label="Choose game mode"><button className={mode === "solo" ? "mode-button selected" : "mode-button"} onClick={() => { setMode("solo"); reset(); }}><span className="mode-icon">◉</span> SOLO <span className="mode-detail">VS COMPUTER</span></button><button className={mode === "local" ? "mode-button selected" : "mode-button"} onClick={() => { setMode("local"); reset(); }}><span className="mode-icon">◎</span> LOCAL <span className="mode-detail">2 PLAYERS</span></button><div className="score-display" aria-live="polite"><span>YOU</span><strong>{scores.left}<i>:</i>{scores.right}</strong><span>{mode === "solo" ? "CPU" : "PLAYER 2"}</span></div></div>
        <div className="court-wrap"><canvas ref={canvasRef} width={WIDTH} height={HEIGHT} aria-label="Pong court. Move your paddle with W and S. First to seven wins."/><div className="court-overlay" aria-live="polite">{status !== "playing" && <div className="overlay-card"><span className="overlay-kicker">{status === "finished" ? "MATCH COMPLETE" : status === "paused" ? "TAKE YOUR TIME" : "COURT IS YOURS"}</span><h2>{status === "finished" ? (scores.left > scores.right ? "That’s the point." : "Good game.") : status === "paused" ? "On pause." : "Ready when you are."}</h2><p>{status === "finished" ? "Fancy another round?" : status === "paused" ? "Pick up right where you left off." : mode === "solo" ? "You’re on the left. W and S to move." : "Player 1: W / S · Player 2: ↑ / ↓"}</p><button className="play-button" onClick={start}>{status === "finished" ? "PLAY AGAIN" : status === "paused" ? "RESUME MATCH" : "START MATCH"}<span>↗</span></button></div>}</div></div>
        <div className="below-court"><div className="control-hint"><span className="keycap">W</span><span className="keycap">S</span><span>MOVE YOUR PADDLE</span></div><button className="pause-button" onClick={() => setStatus((s) => s === "playing" ? "paused" : s === "paused" ? "playing" : s)} aria-label="Pause or resume match">{status === "playing" ? "Ⅱ" : "▶"} &nbsp;{status === "playing" ? "PAUSE" : "RESUME"}</button><button className="reset-button" onClick={reset}>↺ &nbsp; NEW MATCH</button></div>
        <div className="touch-controls"><button onPointerDown={hold("left-up")} onPointerUp={release} onPointerLeave={release} aria-label="Move left paddle up">↑</button><button onPointerDown={hold("left-down")} onPointerUp={release} onPointerLeave={release} aria-label="Move left paddle down">↓</button>{mode === "local" && <><span>PLAYER 2</span><button onPointerDown={hold("right-up")} onPointerUp={release} onPointerLeave={release} aria-label="Move right paddle up">↑</button><button onPointerDown={hold("right-down")} onPointerUp={release} onPointerLeave={release} aria-label="Move right paddle down">↓</button></>}</div>
        <footer className="page-footer"><span>GOOD GAMES. GOOD COMPANY.</span><span>BUILT FOR THE LOVE OF THE GAME <span className="footer-star">✳</span></span></footer>
      </section>
    </main>
  );
}

export default App;
