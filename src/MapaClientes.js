import React from "react";
import Cliente from "./Cliente";
import Empresa from "./Empresa";

function MapaClientes({ clientes, empresa }) {
  // Calcula os pontos de cada linha da rota
  const calcularRota = () => {
    let rota = [];

    // Adiciona o ponto inicial da rota (empresa)
    rota.push(`M ${empresa.x},${empresa.y}`);

    // Adiciona os pontos de cada cliente na rota
    clientes.forEach((cliente) => {
      rota.push(`L ${cliente.x},${cliente.y}`);
    });

    // Fecha a rota
    // rota.push("Z");

    return rota.join(" ");
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Renderiza os clientes */}
      {clientes.map((cliente, index) => (
        <Cliente key={index} x={cliente.x} y={cliente.y} nome={cliente.nome} />
      ))}

      {/* Renderiza a empresa */}
      <Empresa x={empresa.x} y={empresa.y} nome={empresa.nome} />

      {/* Renderiza a rota */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        <path
          d={calcularRota()}
          style={{ fill: "none", stroke: "blue", strokeWidth: 3 }}
        />
      </svg>
    </div>
  );
}

export default MapaClientes;
