import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Produto from "../componentes/Produto";
import { Helmet } from "react-helmet-async";
import Carregamento from "../componentes/Carregamento";
import ErroCarregamento from "../componentes/ErroCarregamento";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, produtos: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function PaginaProdutoFiltroModem() {
  const [{ loading, error, produtos }, dispatch] = useReducer(reducer, {
    produtos: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const buscarDados = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const resultado = await axios.get(
          "http://localhost:3001/selectProduto"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: resultado.data });
      } catch (erro) {
        dispatch({ type: "FETCH_FAIL", payload: erro.message });
      }
    };
    buscarDados();
  }, []);

  return (
    <div>
      <Helmet>
        <title>WireTech</title>
      </Helmet>

      <div className="produtos">
        {loading ? (
          <Carregamento />
        ) : error ? (
          <ErroCarregamento variant="danger">{error}</ErroCarregamento>
        ) : (
          <Row>
            <Col>
              <div>
                <h1>Categorias</h1>
                <Row>
                  <li>
                    <Link to="/produtos/modem">Modem</Link>
                  </li>
                  <br />
                  <br />
                  <li>
                    <Link to="/produtos/roteador">Roteadores</Link>
                  </li>
                  <br />
                  <br />
                  <li>
                    <Link to="/produtos/switch">Switches</Link>
                  </li>
                  <br />
                  <br />
                  <li>
                    <Link to="/produtos">Exibir todos os produtos</Link>
                  </li>
                  <br />
                  <br />
                </Row>
              </div>
            </Col>
            {produtos.map((produto) =>
              produto.categoria_produto === "Roteadores" ||
              produto.categoria_produto === "Roteador" ||
              produto.categoria_produto === "roteador" ? (
                <Col
                  key={produto.link_url}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-3"
                >
                  <Produto produto={produto}></Produto>
                </Col>
              ) : (
                console.log(produto.categoria_produto)
              )
            )}
          </Row>
        )}
      </div>
    </div>
  );
}

export default PaginaProdutoFiltroModem;
