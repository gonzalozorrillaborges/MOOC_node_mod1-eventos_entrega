const Habitacion = require('./habitacion');
const Climatizador = require('./climatizador');
const Termostato = require('./termostato');
const Programador = require('./programador');

// Creamos una habitacion:
const dormitorio = new Habitacion();
dormitorio.temperatura = 22;

// Creamos un climatizador para la habitacion:
const climatizador = new Climatizador(dormitorio);

// Creamos un Termostato que mira la temperatura de la habitacion:
const termostato = new Termostato(dormitorio);

//Creamos un programador para que reajuste la temperatura ideal:
const programador = new Programador(termostato);

// Configuramos el termostato para controlar la temperatura:
termostato.on('muchofrio', () => climatizador.calentar());
termostato.on('muchocalor', () => climatizador.enfriar());

// Mostar la temperatura periodicamente:
termostato.on('tic', (temp) => 
    console.log(`${parseFloat(temp).toFixed(1)}ºC`) //console.log(hoy.toLocaleString('en-US')); console.log(hoy); console.log(hoy2);
);

// Configurar la temp ideal a 20 grados:
termostato.indicarTemperaturaIdeal(20);

//Recibir el evento de reajuste de temperatura
programador.on('ideal', (temp_ideal) => termostato.indicarTemperaturaIdeal(temp_ideal));

// Encender el termostato:
termostato.encender();

//Se inicia el programador
programador.iniciar();
