const { default: axios } = require("axios");

const data = {
  produtos: axios.get("http://localhost:3001/selectProduto"),
};
