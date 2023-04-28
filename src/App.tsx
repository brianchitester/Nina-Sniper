import React from "react";
import List from "./components/List";
import { NinaProvider } from "./context/nina";

function App() {
  return (
    <div
      style={{
        margin: "10px",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <NinaProvider>
        <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
          <h1>Nina Sniper</h1>
          <h3>
            by{" "}
            <a href="https://www.ninaprotocol.com/hubs/corporationplaza">
              Corporation Plaza
            </a>
          </h3>
        </div>
        <List />
      </NinaProvider>
    </div>
  );
}

export default App;
