import React, { useState, useEffect } from "react";
import "./styles.css";
import MapaClientes from "./MapaClientes";
import axios from "axios";

const App = () => {
  // State for clients fetched from the API
  const [clientes, setClientes] = useState([]);
  const [clientshow, setClientesShow] = useState([]);
  // State for error handling
  const [error, setError] = useState(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdite, setShowModalEdite] = useState(false);
  const [showRoutesModal, setShowRoutesModal] = useState(false); // Novo estado para controlar a exibição do modal de rotas
  const [selectedCliente, setSelectedCliente] = useState([]);

  useEffect(() => {
    fetchClientes();
    handleShowAll();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://172.19.0.1:3080/client");
      const data = response.data;
      const clientesFormatados = data.map((item) => ({
        id: item.id,
        nome: item.nome,
        x: item.coordenada_x,
        y: item.coordenada_y,
        cliente_id: item.cliente_id,
      }));
      setClientes(clientesFormatados);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    if (!nome || !email || !telefone || !positionX || !positionY) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    if (isNaN(parseInt(telefone))) {
      setError("O telefone deve conter apenas números.");
      return;
    }
    if (isNaN(parseInt(positionX)) || isNaN(parseInt(positionY))) {
      setError("As coordenadas devem ser números.");
      return;
    }
    const newCliente = {
      nome: nome,
      email: email,
      telefone: telefone,
      coordenada_x: parseInt(positionX),
      coordenada_y: parseInt(positionY),
    };

    try {
      await axios.post("http://172.19.0.1:3080/client", newCliente);
      setClientes([...clientes, newCliente]);
      setNome("");
      setEmail("");
      setTelefone("");
      setPositionX("");
      setPositionY("");
      setError(null); // Limpar o erro após o sucesso
    } catch (error) {
      setError(error.message);
    }
    fetchClientes();
  };

  const handleEditClientes = () => {
    handleShowAll();
    setShowModal(true);
  };

  const handleShowAll = async () => {
    try {
      const response = await axios.get(`http://172.19.0.1:3080/client/show`);
      const data = response.data;
      console.log(data);
      const clientesFormatados = data.map((item) => ({
        cliente_id: item.cliente_id,
        id: item.id,
        nome: item.nome,
        x: item.coordenada_x,
        y: item.coordenada_y,
      }));
      setClientesShow(clientesFormatados);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:3080/client/update/${selectedCliente.cliente_id}`,
        {
          nome: selectedCliente.nome,
          telefone: selectedCliente.telefone,
          coordenada_x: parseInt(selectedCliente.x),
          coordenada_y: parseInt(selectedCliente.y),
        }
      );
      fetchClientes();
      setShowModal(false);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setShowModalEdite(false);
  };

  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente);
    setShowModalEdite(true);
  };

  const handleDeleteCliente = async () => {
    try {
      await axios.delete(
        `http://172.19.0.1:3080/client/${selectedCliente.cliente_id}`
      );
      setShowModalEdite(false); // Fechar o modal após a exclusão
      await handleShowAll(); // Atualizar a lista após a exclusão
    } catch (error) {
      setError(error.message);
    }
    fetchClientes();
  };

  const handleListRoutes = () => {
    setShowRoutesModal(true);
  };
  const handleEditServicoRealizado = async (cliente) => {
    try {
      // Faz uma solicitação PUT para o backend para atualizar o serviço realizado
      await axios.put(
        `http://172.19.0.1:3080/client/update/${cliente.cliente_id}`,
        { servico_realizado: true }
      );

      // Atualiza a lista de clientes para refletir a alteração
      const updatedClientes = clientes.map((c) =>
        c.cliente_id === cliente.cliente_id
          ? { ...c, servico_realizado: true }
          : c
      );
      setClientes(updatedClientes);

      // Mostra uma mensagem de sucesso (opcional)
      alert("Serviço realizado alterado com sucesso!");
    } catch (error) {
      setError(error.message);
    }
  };

  const empresa = { nome: "Clear House", x: 300, y: 300 };

  return (
    <div className="container">
      <div className="contain-rota">
        <MapaClientes clientes={clientes} empresa={empresa} />
        <div className="modal">
          <button className="modalbutton" onClick={handleEditClientes}>
            Editar Clientes
          </button>
          <button className="modalbutton" onClick={handleListRoutes}>
            Listar rotas
          </button>{" "}
          {/* Botão para listar rotas */}
        </div>
      </div>

      <div className="containerLabel">
        <h2 className="titleLabel">Cadastro de Clientes</h2>
        <form onSubmit={handleFormSubmission}>
          <p className="inputLabel">Nome</p>
          <input
            type="text"
            className="input"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <p className="inputLabel">Email</p>
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="inputLabel">Telefone</p>
          <input
            className="input"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <p className="titleCoord">Insira abaixo as coordenadas do cliente</p>
          <div className="inputLocate">
            <input
              className="input inputPosition"
              placeholder="PositonX"
              value={positionX}
              onChange={(e) => setPositionX(e.target.value)}
            />
            <input
              className="input inputPosition"
              placeholder="PositonY"
              value={positionY}
              onChange={(e) => setPositionY(e.target.value)}
            />
          </div>
          <button className="bottonCreate" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
      {/**modal */}

      {showModal && (
        <div className="modal1">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Lista de Clientes</h2>
            <div className="title">
              <h3>Nome e Coordenadas</h3>
            </div>
            <ul>
              {clientshow.map((cliente, index) => (
                <li key={index} onClick={() => handleEditCliente(cliente)}>
                  <span className="client-name">{cliente.cliente_id}</span> -{" "}
                  <span className="client-name">{cliente.nome}</span> -{" "}
                  <span className="client-coordinates">
                    {cliente.x}, {cliente.y}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showModalEdite && (
        <div className="modal1">
          <div className="modal-content , modal1-content">
            <span className="close" onClick={() => setShowModalEdite(false)}>
              &times;
            </span>
            <h2>Editar Cliente</h2>
            <p>
              Nome:{" "}
              <input
                value={selectedCliente.nome}
                onChange={(e) =>
                  setSelectedCliente({
                    ...selectedCliente,
                    nome: e.target.value,
                  })
                }
              />
            </p>
            <p>
              Coordenadas:
              <br />
              X:{" "}
              <input
                value={selectedCliente.x}
                onChange={(e) =>
                  setSelectedCliente({ ...selectedCliente, x: e.target.value })
                }
              />
              <br />
              Y:{" "}
              <input
                value={selectedCliente.y}
                onChange={(e) =>
                  setSelectedCliente({ ...selectedCliente, y: e.target.value })
                }
              />
            </p>
            <button onClick={handleSaveChanges}>Salvar Alterações</button>
            <button onClick={handleDeleteCliente}>Excluir Cliente</button>
          </div>
        </div>
      )}

      {showRoutesModal && ( // Renderização condicional do modal de rotas
        <div className="modal1">
          <div className="modal-content">
            <span className="close" onClick={() => setShowRoutesModal(false)}>
              &times;
            </span>
            <h2>Rotas dos Clientes</h2>
            <div className="title">
              <h3>Nome e Coordenadas</h3>
            </div>
            <ul>
              {clientes.map((cliente, index) => (
                <li key={index}>
                  <span className="client-name">{cliente.cliente_id}</span> -{" "}
                  <span className="client-name">{cliente.nome}</span> -{" "}
                  <span className="client-coordinates">
                    {cliente.x}, {cliente.y}
                  </span>
                  <button
                    onClick={() => handleEditServicoRealizado(cliente)}
                    className="edit-button"
                  >
                    Alterar Serviço Realizado
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
