import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { Loja } from "../Loja";

function Produto(props) {
  const { produto } = props;
  const { state, dispatch: ctxDispatch } = useContext(Loja);
  const {
    carrinho: { carrinhoItems },
  } = state;

  const adicionarAoCarrinho = async (item) => {
    const itemExistente = carrinhoItems.find(
      (x) => x.id_produto === produto.id_produto
    );

    const quantidade = itemExistente ? itemExistente.quantidade + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:3001/selectProduto/${item.id_produto}`,
      { id: item.id_produto }
    );

    if (data.estoque_produto < quantidade) {
      window.alert("Nos desculpe. O produto está sem estoque :(");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantidade },
    });
  };

  return (
    <Card>
      <Link to={`/produto/${produto.link_url}`}>
        <img
          src={produto.imagem_produto_path}
          className="card-img-top"
          height="300px"
          alt={produto.nome_produto}
        />
      </Link>
      <Card.Body>
        <Link to={`/produto/${produto.link_url}`}>
          <Card.Title>{produto.nome_produto}</Card.Title>
        </Link>
        <Card.Text>
          <h5>Valor: R${produto.valor_produto} </h5>
        </Card.Text>
        {produto.estoque_produto === 0 ? (
          <Button disabled className={"btnEstoqueDisponivel"}>
            Produto indisponivel
          </Button>
        ) : (
          <Button
            onClick={() => adicionarAoCarrinho(produto)}
            className={"btnEstoqueDisponivel"}
          >
            {produto.estoque_produto > 0
              ? "Adicionar ao carrinho"
              : "Produto Indisponivel"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Produto;
