import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SESSION_SECONDS = 25 * 60;

export function PomodoroTimer() {
  const [seconds, setSeconds] = useState(SESSION_SECONDS);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setSeconds(remaining);
      if (remaining === 0) setRunning(false);
    }, 200);
    return () => window.clearInterval(interval);
  }, [running]);

  function start() {
    if (running || seconds === 0) return;
    deadline.current = Date.now() + seconds * 1000;
    setRunning(true);
  }

  function pause() {
    setSeconds(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
    setRunning(false);
  }

  const time = `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
  const status = seconds === 0 ? "Session complete" : running ? "Time to focus" : seconds < SESSION_SECONDS ? "Take a breath" : "Ready when you are";

  return (
    <div className="timer-app">
      <header className="app-header">
        <a href="/" className="brand" aria-label="Datarain cronômetro home"><span className="brand-symbol"><span /><span /><span /></span><h1>Datarain <span>cronômetro</span></h1></a>
        <span className="header-note">A little focus. A lot of possibility.<ArrowUpRight size={14} /></span>
      </header>
      <main className="timer-main">
        <div className="focus-label"><span className={running ? "status-dot is-running" : "status-dot"} /> FOCUS SESSION</div>
        <h2>Make room for focus.</h2>
        <p className="intro">One thing at a time. One moment at a time.</p>
        <div className="timer-dial" aria-label="25 minute Pomodoro timer">
          <svg className="dial-art" viewBox="0 0 440 440" aria-hidden="true">
            {Array.from({ length: 60 }, (_, i) => {
              const angle = (i * 6 - 90) * Math.PI / 180;
              const inner = i % 5 === 0 ? 207 : 212;
              return <line key={i} className={i % 5 === 0 ? "dial-tick major" : "dial-tick"} x1={220 + Math.cos(angle) * inner} y1={220 + Math.sin(angle) * inner} x2={220 + Math.cos(angle) * 216} y2={220 + Math.sin(angle) * 216} />;
            })}
            <circle className="dial-track" cx="220" cy="220" r="185" />
            <circle className="dial-progress" cx="220" cy="220" r="185" pathLength="1500" strokeDasharray={`${seconds} 1500`} transform="rotate(-90 220 220)" />
          </svg>
          <div className="dial-content"><span className="dial-caption">POMODORO</span><span className="time-value" role="timer" aria-label={time}>{time}</span><span className="dial-status" aria-live="polite">{status}</span></div>
        </div>
        <div className="timer-controls">
          <Button variant="default" className="timer-button start-button" onClick={start} disabled={running || seconds === 0}><Play fill="currentColor" />Start</Button>
          <Button variant="outline" className="timer-button" onClick={pause} disabled={!running}><Pause />Pause</Button>
          <Button variant="outline" className="timer-button" onClick={() => { setRunning(false); setSeconds(SESSION_SECONDS); }}><RotateCcw />Reset</Button>
        </div>
        <div className="session-note"><span className="note-line" /><span>25 minutes, just for you.</span><span className="note-line" /></div>
      </main>
      <footer className="app-footer"><span><Sparkles size={14} /> Small steps. Meaningful progress.</span><span>STAY PRESENT.</span></footer>
    </div>
  );
}