import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-bg/80 backdrop-blur border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto flex justify-between p-4">
        <h1 className="text-primary font-bold text-lg">ImageSecureAI</h1>
        <div className="space-x-6">
          <Link to="/">Home</Link>
          <Link to="/encrypt">Encrypt</Link>
          <Link to="/decrypt">Decrypt</Link>
          <Link to="/workflow">Workflow</Link>
          <Link to="/metrics">Metrics</Link>
        </div>
      </div>
    </nav>
  );
}
