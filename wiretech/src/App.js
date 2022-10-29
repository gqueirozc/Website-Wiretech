import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import PaginaPrincipal from "./paginas/PaginaPrincipal";
import PaginaProduto from "./paginas/PaginaProduto";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropDown from "react-bootstrap/NavDropDown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Loja } from "./Loja";
import PaginaCarrinho from "./paginas/PaginaCarrinho";
import PaginaLogin from "./paginas/PaginaLogin";
import { AuthProvider, AuthContext } from "./autenticacao/auth";
import PaginaFinalizarCompra from "./paginas/PaginaFinalizarCompra";
import { useEffect } from "react";
import { useState } from "react";
import PaginaEndereco from "./paginas/PaginaEndereco";
import PaginaRegistrar from "./paginas/PaginaRegistrar";
import PaginaPagamento from "./paginas/PaginaPagamento";
import PaginaPedido from "./paginas/PaginaPedido";
import PaginaHistorico from "./paginas/PaginaHistorico";
import PaginaPerfil from "./paginas/PaginaPerfil";
import PaginaProdutos from "./paginas/PaginaProdutos";
import PaginaProdutoFiltroModem from "./paginas/PaginaProdutoFiltroModem";
import PaginaProdutoFiltroRoteador from "./paginas/PaginaProdutoFiltroRoteador";
import PaginaProdutoFiltroSwitch from "./paginas/PaginaProdutoFiltroSwitch";

function App() {
  const { state } = useContext(Loja);
  const { carrinho } = state;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    setUser(JSON.parse(recoveredUser));
    console.log(user);
  }, []);

  const logout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("user");
    localStorage.removeItem("paymentData");
    localStorage.removeItem("shippingData");

    setUser(null);
    Navigate("/");
  };

  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (authenticated === false) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>WireTech</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/produtos" className="nav-link">
                    Produtos
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/carrinho" className="nav-link">
                    Carrinho
                    {carrinho.carrinhoItems.length > 0 && (
                      <Badge pill bg="danger">
                        {carrinho.carrinhoItems.reduce(
                          (a, c) => a + c.quantidade,
                          0
                        )}
                      </Badge>
                    )}
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {user ? (
                    <NavDropDown title={user.user} id="basic-nav-dropdown">
                      <LinkContainer to="/perfil">
                        <NavDropDown.Item>Perfil</NavDropDown.Item>
                      </LinkContainer>
                      <LinkContainer to="/historico">
                        <NavDropDown.Item>Historico</NavDropDown.Item>
                      </LinkContainer>
                      <NavDropDown.Divider />
                      <LinkContainer to="/">
                        <NavDropDown.Item onClick={logout}>
                          Sair
                        </NavDropDown.Item>
                      </LinkContainer>
                    </NavDropDown>
                  ) : (
                    <Link className="nav-link" to="/entrar">
                      Entrar
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <AuthProvider>
              <Routes>
                <Route
                  path="/pedido/:id_cliente/:valor_total"
                  element={
                    <Private>
                      <PaginaPedido />
                    </Private>
                  }
                />
                <Route path="/produto/:link" element={<PaginaProduto />} />
                <Route path="/carrinho" element={<PaginaCarrinho />} />
                <Route path="/entrar" element={<PaginaLogin />} />
                <Route
                  path="/entrar?redirect=conferirEndereco"
                  element={<PaginaLogin />}
                />
                <Route path="/produtos" element={<PaginaProdutos />} />
                <Route path="/registrar" element={<PaginaRegistrar />} />
                <Route
                  path="/registrar?redirect=conferirEndereco"
                  element={<PaginaRegistrar />}
                />
                <Route
                  path="/tipoPagamento?redirect=finalizarCompra"
                  element={
                    <Private>
                      <PaginaPagamento />
                    </Private>
                  }
                />
                <Route
                  path="/finalizarCompra"
                  element={
                    <Private>
                      <PaginaFinalizarCompra />
                    </Private>
                  }
                />
                <Route
                  path="/tipoPagamento"
                  element={
                    <Private>
                      <PaginaPagamento />
                    </Private>
                  }
                />
                <Route
                  path="/editarPagamento"
                  element={
                    <Private>
                      <PaginaPagamento />
                    </Private>
                  }
                />
                <Route
                  path="/editarEndereco"
                  element={
                    <Private>
                      <PaginaEndereco />
                    </Private>
                  }
                />
                <Route
                  path="/alterarCarrinho"
                  element={
                    <Private>
                      <PaginaCarrinho />
                    </Private>
                  }
                />
                <Route
                  path="/historico"
                  element={
                    <Private>
                      <PaginaHistorico />
                    </Private>
                  }
                />
                <Route
                  path="/perfil"
                  element={
                    <Private>
                      <PaginaPerfil />
                    </Private>
                  }
                />
                <Route path="/" element={<PaginaPrincipal />} />
                <Route path="/conferirEndereco" element={<PaginaEndereco />} />
                <Route path="/produtos" element={<PaginaProdutos />} />
                <Route
                  path="/produtos/modem"
                  element={<PaginaProdutoFiltroModem />}
                />
                <Route
                  path="/produtos/roteador"
                  element={<PaginaProdutoFiltroRoteador />}
                />
                <Route
                  path="/produtos/switch"
                  element={<PaginaProdutoFiltroSwitch />}
                />
                <Route path="*" element={<PaginaPrincipal />}></Route>
              </Routes>
            </AuthProvider>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved © Wiretech</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
