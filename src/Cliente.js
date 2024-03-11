import React from "react";
import "./Cliente.css";

function Cliente({ nome, x, y, servicoRealizado}) {
 
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div className="circle" />
      <div className="label">
        <p className="nameTitle">{nome}</p>
        <p>  {`Coordenada X ${x}`} </p>
        <p>  {`Coordenada Y ${y}`} </p>
      </div>
    </div>
  );
}

export default Cliente;