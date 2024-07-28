//VARIÁVEIS => Um espaço da memória do computador que guardamos algo (um numero, uma letra, um texto, uma imagem)
// FUNÇÃO => Um trecho de código que só é executado quando é chamado

let chave = "cebcd482eda57fa9a6714c1c2ba91885";

function colocarNaTela(dados) {
  console.log("Dados recebidos:", dados); // Log para verificar os dados recebidos da API

  const cidadeElemento = document.querySelector(".cidade");
  const tempElemento = document.querySelector(".temp");
  const descricaoElemento = document.querySelector(".descricao");
  const umidadeElemento = document.querySelector(".umidade");
  const iconeElemento = document.querySelector(".icone");

  console.log("Elementos encontrados:", cidadeElemento, tempElemento, descricaoElemento, umidadeElemento, iconeElemento);

  if (cidadeElemento && tempElemento && descricaoElemento && umidadeElemento && iconeElemento) {
    cidadeElemento.innerHTML = "Tempo em " + dados.name;
    tempElemento.innerHTML = Math.floor(dados.main.temp) + "°C";
    descricaoElemento.innerHTML = dados.weather[0].description;
    umidadeElemento.innerHTML = dados.main.humidity + "%";
    iconeElemento.src =
      "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
  } else {
    console.error("Um ou mais elementos não foram encontrados no DOM.");
  }
}

async function buscarCidade(cidade) {
  console.log("Buscando dados para a cidade:", cidade); // Log para verificar a cidade pesquisada
  try {
    let dados = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        "&appid=" +
        chave +
        "&lang=pt_br" +
        "&units=metric"
    ).then((resposta) => resposta.json());

    console.log("Resposta da API:", dados); // Log para verificar a resposta da API

    if (dados.cod === 200) {
      colocarNaTela(dados);
    } else {
      console.error("Erro ao buscar dados da cidade:", dados.message);
      alert("Erro ao buscar dados da cidade. Verifique se o nome da cidade está correto.");
    }
  } catch (erro) {
    console.error("Erro ao buscar dados da cidade:", erro);
    alert("Erro ao buscar dados da cidade. Verifique se o nome da cidade está correto.");
  }
}

function cliqueiNoBotao() {
  let cidade = document.querySelector(".input-cidade").value;
  console.log("Cidade digitada:", cidade); // Log para verificar o valor da cidade digitada
  if (cidade) {
    buscarCidade(cidade);
  } else {
    alert("Por favor, digite o nome de uma cidade.");
  }
}
