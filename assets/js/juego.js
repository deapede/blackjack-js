
const miModulo = (() => {
    'use strict'

    let deck            = [];
    const tipos         = ['C','D','H','S',];
    const especiales    = ['A','J','Q','K',];

    let puntosJugadores = [];
    
    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnDetener = document.querySelector('#btnDetener');
    const smalls = document.querySelectorAll('small');
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    
    const initJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();   
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
            
        }

        smalls.forEach( elem => elem.innerText = 0 );
    
        divCartasJugadores.forEach(elem => elem.innerText = '');
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }
    
    
    const crearDeck = () => {

        deck = [];
        
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
    
    
        return _.shuffle(deck);
    }
    
    
    
    // Función permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay mas cartas en el deck';
        }
    
        return deck.pop();
    }
    
    const valorCarta = (carta) => {

        const valor = carta.substring(0,carta.length - 1);
        
        return (isNaN(valor)) 
                ? (valor === 'A') ? 11 : 10 
                : parseInt(valor);
    }

    // Turno: 0 = primer jugador y ultimo computadora.
    const acumularPuntos = ( turno, carta ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
            
        smalls[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }
    
    
    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        

        setTimeout(() => {
            
            if ( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana!');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana');
            }else if ( puntosComputadora > 21 ){
                alert('Jugador gana!');
            } 
            // else if (puntosJugador === 21){
            //     alert('Jugador gana!');
            // } 
            else {
                alert('Computadora gana');
            }
    
        }, 20);

    }
    
    
    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        
        let puntosComputadora = 0;
    
        do {
    
            const carta = pedirCarta();
    
            puntosComputadora = acumularPuntos(  puntosJugadores.length - 1, carta );
            crearCarta(carta, puntosJugadores.length - 1);
        
            if(puntosMinimos > 21){
                break;
            }
            
        } while ((puntosComputadora < puntosMinimos) &&  (puntosMinimos <= 21));

        determinarGanador();

    }
    
    // Eventos
    btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();
    
        const puntosJugador = acumularPuntos( 0, carta );

        crearCarta(carta, 0);
    
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
        btnDetener.disabled = true; 
        turnoComputadora(puntosJugadores[0]);
    })
    
    btnNuevo.addEventListener('click', () => {

        initJuego();

    })


    return {
        nuevoJuego: initJuego
    };
    
})();





