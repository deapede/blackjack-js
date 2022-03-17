


let deck            = [];
const tipos         = ['C','D','H','S',];
const especiales    = ['A','J','Q','K',];
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const smalls = document.querySelectorAll('small');
const cartasJugador = document.querySelector('#jugador-cartas');


const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);            
        }
        
    }

    for(let tipo of tipos){
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}


crearDeck();

// Función permite tomar una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay mas cartas en el deck';
    }

    let carta = deck.pop();

    console.log(deck);
    console.log(carta);
    return carta;
}

// pedirCarta();
const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length - 1);
    return (isNaN(valor)) 
            ? (valor === 'A') ? 11 : 10 
            : parseInt(valor);
}


// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    
    smalls[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    cartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Perdiste');
        btnPedir.disabled = true;
    }
    
    
})




