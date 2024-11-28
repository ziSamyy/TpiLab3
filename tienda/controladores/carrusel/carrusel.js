const htmlCarrusel =

`
    <div class="conteCarrousel">
                <div class="itemCarrousel" id="itemCarrousel-1">
                    <div class="itemCarrouselTarjeta">
                        <img src="/img/slider/TangoByte.png" alt="">
                    </div>
                    <div class="itemCarrouselArrows">
                        <a href="#itemCarrousel-3">
                            <i class="fas fa-chevron-left"></i>
                        </a>
                        <a href="#itemCarrousel-2">
                            <i class="fas fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="itemCarrousel" id="itemCarrousel-2">
                    <div class="itemCarrouselTarjeta">
                        <img src="/img/slider/GUcVaaVW0AAc_-1.jpg" alt="">
                    </div>
                    <div class="itemCarrouselArrows">
                        <a href="#itemCarrousel-1">
                            <i class="fas fa-chevron-left"></i>
                        </a>
                        <a href="#itemCarrousel-3">
                            <i class="fas fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="itemCarrousel" id="itemCarrousel-3">
                    <div class="itemCarrouselTarjeta">
                        <img src="/img/slider/Personajes_Juegos_Switch_371c8bd6-ecb4-4131-936b-8d04b6ed0784.png" alt="">
                    </div>
                    <div class="itemCarrouselArrows">
                        <a href="#itemCarrousel-2">
                            <i class="fas fa-chevron-left"></i>
                        </a>
                        <a href="#itemCarrousel-1">
                            <i class="fas fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
`



export async function Carrusel() {
    let d = document;
    let seccionCarrusel = d.querySelector(".carrusel");
    let seccionLogin = d.querySelector(".seccionLogin");
    seccionLogin.innerHTML = "";
    seccionCarrusel.innerHTML = htmlCarrusel;
  }
  