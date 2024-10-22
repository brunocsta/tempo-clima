const container = document.querySelector(".container");
const caixaBusca = document.querySelector(".caixa-busca button");
const caixaTempo = document.querySelector(".caixa-tempo");
const tempoDetalhes = document.querySelector(".tempo-detalhes");
const error404 = document.querySelector(".not-found");
const cidadeOculta = document.querySelector(".cidade-oculta");

window.onload = () =>
  (document.querySelector(".caixa-busca input").value = " ");

caixaBusca.addEventListener("click", () => {
  //
  const APIKey = "e4835580c71ec326782a0114bdffc2ef";
  const cidade = document.querySelector(".caixa-busca input").value;

  if (cidade == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}&lang=pt_br`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cidadeOculta.textContent = cidade;
        container.style.height = "400px";
        caixaTempo.classList.remove("active");
        tempoDetalhes.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      const img = document.querySelector(".caixa-tempo img");
      const temperatura = document.querySelector(".caixa-tempo .temperatura");
      const descricao = document.querySelector(".caixa-tempo .descricao");
      const umidade = document.querySelector(".tempo-detalhes .umidade span");
      const vento = document.querySelector(".tempo-detalhes .vento span");

      if (cidadeOculta.textContent == cidade) {
        return;
      } else {
        cidadeOculta.textContent = cidade;
        container.style.height = "555px";
        container.classList.add("active");
        caixaTempo.classList.add("active");
        tempoDetalhes.classList.add("active");
        error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            img.src = "assets/images/clear.png";
            break;

          case "Rain":
            img.src = "assets/images/rain.png";
            break;

          case "Snow":
            img.src = "assets/images/snow.png";
            break;

          case "Clouds":
            img.src = "assets/images/cloud.png";
            //console.log('passou');
            break;

          case "Mist":
            img.src = "assets/images/mist.png";

            break;

          case "Haze":
            img.src = "assets/images/mist.png";
            break;

          default:
            break;
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descricao.innerHTML = `${json.weather[0].description}`;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoTempo = document.querySelector(".info-tempo");
        const infoUmidade = document.querySelector(".info-umidade");
        const infoVento = document.querySelector(".info-vento");

        const elCloneInfoTempo = infoTempo.cloneNode(true);
        const elCloneInfoUmidade = infoUmidade.cloneNode(true);
        const elCloneInfoVento = infoVento.cloneNode(true);

        elCloneInfoTempo.id = "clone-info-tempo";
        elCloneInfoTempo.classList.add("active-clone");

        elCloneInfoUmidade.id = "clone-info-umidade";
        elCloneInfoUmidade.classList.add("active-clone");

        elCloneInfoVento.id = "clone-info-vento";
        elCloneInfoVento.classList.add("active-clone");

        setTimeout(() => {
          infoTempo.insertAdjacentElement("afterend", elCloneInfoTempo);
          infoUmidade.insertAdjacentElement("afterend", elCloneInfoUmidade);
          infoVento.insertAdjacentElement("afterend", elCloneInfoVento);
        }, 2200);

        const cloneInfoTempo = document.querySelectorAll(
          ".info-tempo.active-clone"
        );
        const totalCloneInfoTempo = cloneInfoTempo.length;
        const clonePrimeiraInfoTempo = cloneInfoTempo[0];
        // console.log(
        //   cloneInfoTempo,
        //   clonePrimeiraInfoTempo,
        //   totalCloneInfoTempo
        // );

        const cloneInfoUmidade = document.querySelectorAll(
          ".info-umidade.active-clone"
        );
        const clonePrimeiraInfoUmidade = cloneInfoUmidade[0];

        const cloneInfoVento = document.querySelectorAll(
          ".info-vento.active-clone"
        );
        const clonePrimeiraInfoVento = cloneInfoVento[0];

        if (totalCloneInfoTempo > 0) {
          clonePrimeiraInfoTempo.classList.remove("active-clone");
          clonePrimeiraInfoUmidade.classList.remove("active-clone");
          clonePrimeiraInfoVento.classList.remove("active-clone");

          setTimeout(() => {
            clonePrimeiraInfoTempo.remove();
            clonePrimeiraInfoUmidade.remove();
            clonePrimeiraInfoVento.remove();
          }, 2200);
        }


      }
    });
});
