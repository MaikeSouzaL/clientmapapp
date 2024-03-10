import React from "react";
import "./Empresa.css"

function Empresa({ x, y, nome }) {
  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "red",
        borderRadius: "50%",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <p className="titleempresa" style={{ width: "200px" }}>Empresa: {nome}</p>
    </div>
  );
}

export default Empresa;
