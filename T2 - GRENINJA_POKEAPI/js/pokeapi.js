let cancion = document.getElementById("song");
cancion.volume = 0.25;

let _main = document.querySelector('#contenedor') 

_main.addEventListener('click', pokemon);

function pokemon(){
    fetch("https://pokeapi.co/api/v2/pokemon/greninja")
    .then((resp)=>resp.json())
    .then((res)=>{
        _main.innerHTML=`
        <div class="slide fade">
            <div class="cuadro1">
                <div class="stats">
                <h3>BASE STATS</h3>
                <br>
                    <span>${res.stats[0].stat.name}: </span>
                    <span>${res.stats[0].base_stat}</span>
                    <br>
                    <span>${res.stats[1].stat.name}: </span>
                    <span>${res.stats[1].base_stat}</span>
                    <br>
                    <span>${res.stats[2].stat.name}: </span>
                    <span>${res.stats[2].base_stat}</span>
                    <br>
                    <span>${res.stats[3].stat.name}: </span>
                    <span>${res.stats[3].base_stat}</span>
                    <br>
                    <span>${res.stats[4].stat.name}: </span>
                    <span>${res.stats[4].base_stat}</span>
                    <br>
                    <span>${res.stats[5].stat.name}: </span>
                    <span>${res.stats[5].base_stat}</span>
                </div>
            </div>
            <div class="cuadro2">
                <div class="nameInfo">
                    <h2>${res.name}</h2>
                    <h2>Entry Number: ${res.id}</h2>
                </div>
                <div class="greninja">
                <img src='${res.sprites.front_default}' width='300px'></img>
                </div>
            </div>
            <div class="cuadro3">
                <div class="mov">
                    <h3>MOVES IT CAN USE</h3>
                    <br>
                    <span>${res.moves[53].move.name}: learned at lvl </span>
                    <span>${res.moves[53].version_group_details[0].level_learned_at}</span>
                    <br>
                    <span>${res.moves[17].move.name}: learned at lvl </span>
                    <span>${res.moves[17].version_group_details[0].level_learned_at}</span>
                    <br>
                    <span>${res.moves[55].move.name}: learned at lvl </span>
                    <span>${res.moves[55].version_group_details[0].level_learned_at}</span>
                    <br>
                    <span>${res.moves[22].move.name}: learned at lvl </span>
                    <span>${res.moves[22].version_group_details[0].level_learned_at}</span>
                    <br>
                    <span>${res.moves[4].move.name}: learned at lvl </span>
                    <span>${res.moves[4].version_group_details[0].level_learned_at}</span>
                </div>
            </div>
        </div>

        <div class="slide fade">
            <div class="tipos">
                <h3>${res.name}'s Pokémon Types</h3>
                <br>
                <div class="type1">
                    <span>${res.types[0].type.name}</span>
                    <br>
                    <img src='./img/water.png'></img>
                <br>
                </div>
                <div class="type2">
                    <span>${res.types[1].type.name}</span>
                    <br>
                    <img src='./img/dark.png'></img>
                </div>
            </div>
                
            <div class="evo">
            <h3>Evolved From:</h3>
            <br>
                <div class="evo1">
                    <div class="info1">
                        <span>Froakie</span>
                        <br><br>
                        <span>(No. 656)</span>
                    </div>
                    <br>
                    <img src='./img/Froakie.png'></img>
                </div>
                <div class="evo2">
                    <div class="info2">
                        <span>Frogadier</span>
                        <br><br>
                        <span>(No. 657)</span>
                    </div>
                    <br>
                    <img src='./img/Frogadier.png'></img>
                </div>
            </div>
        </div>
        `;
        console.log(res);
        actual(1);
    })
}

var Index = 1;

function showSlides(x) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (x > slides.length) {
        Index = 1
    }
    if (x < 1) {
        Index = slides.length
    }
    
    slides[Index-1].style.display = "block";
    
    for (i = 1; i < slides.length; i++) {
        slides[x].style.display = "none";
    }
}
  
// Next/previous controls
function nextS(x) {
  showSlides(Index += x);
}
    
// Thumbnail image controls
function actual(x) {
    showSlides(Index = x);
}

showSlides(Index);