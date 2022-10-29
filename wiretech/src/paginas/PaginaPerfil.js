import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "../autenticacao/auth";
import { useContext } from "react";

export default function PaginaRegistrar() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [errorMessageValue, setErrorMessageValue] = useState("");
  const [name, setName] = useState("");
  const [email_form, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf_form, setCpf] = useState(0);
  const [sexo_form, setSexo] = useState("");
  const [telefone_form, setTelefone] = useState(0);
  const [ano_nasc_form, setAnoNasc] = useState({ varOne: new Date() });
  const [cidade_form, setCidade] = useState("");
  const [endereco_form, setEndereco] = useState("");
  const [cep_form, setCep] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, loginWithRedirect } = useContext(AuthContext);

  const [dadosUsuario, setDadosUsuario] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        `http://localhost:3001/selectCurrentClient`,
        { id: localStorage.getItem("userID") }
      );

      setName(data[0].nome_cliente);
      setEmail(data[0].email_cliente);
      setPassword(data[0].senha_cliente);
      setCpf(data[0].cpf_cliente);
      setSexo(data[0].sexo_cliente);
      setTelefone(data[0].telefone_cliente);
      setAnoNasc(data[0].ano_nasc);
      setCidade(data[0].cidade_cliente);
      setEndereco(data[0].endereco_cliente);
      setCep(data[0].cep_cliente);
    })();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    (async () => {
      if (password !== confirmPassword) {
        setErrorMessageValue("Senhas não coincidem. Tente novamente.");
        console.log("Erro, senhas diferentes");
      } else {
        window.alert("DADOS ATUALIZADOS!");
        const user = name;
        const email = email_form;
        const loggedUser = {
          user,
          email,
        };
        localStorage.setItem("user", JSON.stringify(loggedUser));
        window.location.reload();

        await axios.post(`http://localhost:3001/atualizarClienteAtual`, {
          nome: name,
          email: email_form,
          senha: password,
          cpf: cpf_form,
          sexo: sexo_form,
          telefone: telefone_form,
          ano_nasc: ano_nasc_form,
          cidade: cidade_form,
          endereco: endereco_form,
          cep: cep_form,
          id: localStorage.getItem("userID"),
        });
      }
    })();
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Perfil</title>
      </Helmet>
      <h1 className="my-3">Dados do usuario</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email_form">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email_form}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            value={password}
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirmar Senha</Form.Label>
            <Form.Control
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Group>
        <Form.Group className="mb-3" controlId="cpf_form">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            value={cpf_form}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sexo_form">
          <Form.Label>Sexo</Form.Label>
          <Form.Select
            value={sexo_form}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option>Masculino</option>
            <option>Feminino</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="telefone_cep">
          <Form.Label>Telefone/Celular</Form.Label>
          <Form.Control
            value={telefone_form}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ano_nasc_form">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            value={ano_nasc_form}
            onChange={(e) => setAnoNasc(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cidade_form">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            value={cidade_form}
            onChange={(e) => setCidade(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="endereco_form">
          <Form.Label>Endereço Completo</Form.Label>
          <Form.Control
            value={endereco_form}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cep_form">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            value={cep_form}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </Form.Group>
        <div
          className={
            errorMessageValue === ""
              ? "mensagemErroLogin-false"
              : "mensagemErroLogin"
          }
        >
          {errorMessageValue === "Senhas não coincidem. Tente novamente."
            ? errorMessageValue
            : errorMessageValue === "Email ja existente no banco de dados."
            ? errorMessageValue
            : ""}
        </div>
        <div className="mb-3">
          <Button type="submit" className={"btnEstoqueDisponivel"}>
            Atualizar Dados
          </Button>
        </div>
      </Form>
    </Container>
  );
}
