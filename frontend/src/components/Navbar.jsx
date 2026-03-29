import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        // position: "fixed",
        width: "100vw",
        background: "rgba(0,0,0,0.8)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
          ImageSecureAI
        </h1>

        {/* 🔥 LINKS WITH FORCED SPACING */}
        <div>
          <Link to="/" style={{ marginRight: "24px", display: "inline-block", color: "#4f7cff" }}>
            Home
          </Link>
          <Link to="/encrypt" style={{ marginRight: "24px", display: "inline-block", color: "#4f7cff" }}>
            Encrypt
          </Link>
          <Link to="/decrypt" style={{ marginRight: "24px", display: "inline-block", color: "#4f7cff" }}>
            Decrypt
          </Link>
          <Link to="/workflow" style={{ marginRight: "24px", display: "inline-block", color: "#4f7cff" }}>
            Workflow
          </Link>
          {/* <Link to="/metrics" style={{ display: "inline-block", color: "#4f7cff" }}>
            Metrics
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
