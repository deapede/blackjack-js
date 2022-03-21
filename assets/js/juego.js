


let deck            = [];
const tipos         = ['C','D','H','S',];
const especiales    = ['A','J','Q','K',];
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const smalls = document.querySelectorAll('small');
const cartasJugador = document.querySelector('#jugador-cartas');
const cartasComputadora = document.querySelector('#computadora-cartas');


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

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {


    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        
        smalls[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        cartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }
        
    } while ((puntosComputadora < puntosMinimos) &&  (puntosMinimos <= 21));

    
    setTimeout(() => {
        
        if ( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana!');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana');
        }else if ( puntosComputadora > 21 ){
            alert('Jugador gana!');
        }else {
            alert('Computadora gana');
        }

    }, 20);
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
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21){
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();
    }
    
    
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true; 
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {
    console.clear();

    deck = [];
    crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    smalls[0].innerText = 0;
    smalls[1].innerText = 0;

    cartasComputadora.innerHTML = '';
    cartasJugador.innerText = '';
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
})




