import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        // position: "fixed",
        width: "100%",
        background: "rgba(0,0,0,0.8)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          // margin: "0 auto",
          // height:"80px",
          padding: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: "35px", fontWeight: "bold" }}>
          ImageSecureAI
        </h1>

        {/* 🔥 LINKS WITH FORCED SPACING */}
        <div>
          <Link to="/" style={{ marginRight: "24px", display: "inline-block", color: "#4f7cff", fontSize: "20px" }}>
            Home
          </Link>
          <Link to="/encrypt" style={{ marginRight: "24px", display: "inline-block", color: "#4f7cff", fontSize: "20px" }}>
            Encrypt
          </Link>
          <Link to="/decrypt" style={{ marginRight: "24px", display: "inline-block", color: "#4f7cff", fontSize: "20px" }}>
            Decrypt
          </Link>
          <Link to="/workflow" style={{ marginRight: "24px", display: "inline-block", color: "#4f7cff", fontSize: "20px" }}>
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
