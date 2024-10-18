const container = document.querySelector(".container");
const caixaBusca = document.querySelector(".caixa-busca");
const caixaTempo = document.querySelector(".caixa-tempo");
const tempoDetalhes = document.querySelector(".tempo-detalhes");

caixaBusca.addEventListener("click", () => {
  const APIKey = "e4835580c71ec326782a0114bdffc2ef";
  const cidade = document.querySelector(".caixa-busca input").value;

  if (cidade == "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.jason())
    .then((json) => {
      const img = document.querySelector(".caixa-tempo img");
      const temperatura = document.querySelector(".caixa-tempo .temperatura");
      const descricao = document.querySelector(".caixa-tempo .descricao");
      const umidade = document.querySelector(".tempo-detalhes .umidade span");
      const vento = document.querySelector(".tempo-detalhes .vento span");

      switch (json.weather[0].main) {
        case "Clear":
          img.src = "../images/clear.png";
          break;

        case "Rain":
          img.src = "../images/rain.png";
          break;

        case "Snow":
          img.src = "../images/snow.png";
          break;

        case "Clouds":
          img.src = "../images/cloud.png";
          break;

        case "Mist":
          img.src = "../images/mist.png";
          break;

        case "Haze":
          img.src = "../images/mist.png";
          break;

        default:
          break;
      }
    });
});
