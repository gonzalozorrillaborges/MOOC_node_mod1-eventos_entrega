//const EventEmitter = require('events');
const EventEmitter = require('./events');
const later = require('later');
var hoy;
later.date.localTime();


class Programador extends EventEmitter {


    constructor(termostato){
        super();

        
        this.programacion = [{ hora: "07:00",temperatura: 22},{ hora: "08:30",temperatura: 18},{ hora: "12:53",temperatura: 22},{ hora: "17:56",temperatura: 27},{ hora: "21:48",temperatura: 22},{ hora: "23:00",temperatura: 20}];
        
        /////////////////////////////////////////////////////////////////////////////////7
        //Esta es una bateria de test que agrega a la programación del evento de 
        //un cambio de temperatura a 25 grados al minuto siguiente que se arranca el programa
        //De esta manera quien pruebe el programa puede verificar el funcionamiento del programador
        var a="";
        var b="";

        //Para agregar el cero en las horas menores a 10 para evitar errores de later
        if ((new Date()).getHours()<10) { a = 0};

        //Para agregar el cero en los minutos menores a 9 para evitar errores. 
        //Se usa nueve porque luego se suma 1 para que la programación sea en el siguiente minuto 
        if ((new Date()).getMinutes()<9) { b = 0};
        this.test_prog = (new Date()).getHours()*100+(new Date()).getMinutes()+1;
        console.log(this.test_prog);
        this.test_prog_string = a + (new Date()).getHours().toString()+":"+ b +((new Date()).getMinutes()+1).toString();
        console.log(this.test_prog_string);
        this.test_prog_obj = {};
        this.test_prog_obj.hora = this.test_prog_string;
        this.test_prog_obj.temperatura = 25;
        this.programacion.push(this.test_prog_obj);
        
        // Aquí termina la batería de test para disparar el evento programado
        ////////////////////////////////////////////////////////////////////////


        this.termostato = termostato;
        
        
    }

    iniciar(){
        console.log(JSON. stringify(this.programacion));
        
        var sched;
        var temp_ideal;
        
        this.programacion.forEach((element, i) => {
            
            
            sched = later.parse.text("at "+element.hora);
            
            later.setInterval( () => {
                // Esto era para mostrar la hora en otro formato y para efectos de depuracion
                //hoy = new Date().toLocaleString('en-US', {hour12: false});  
                temp_ideal = element.temperatura;
                this.emit('ideal',temp_ideal);
                console.log("PROGRAMADOR: CAMBIO DE TEMPERATURA IDEAL A: "+ temp_ideal);
        
            }, sched);

        });
        
        
        


        //Para efectos de depuración se usó está línea
        //this.termostato.indicarTemperaturaIdeal()
    }


}

exports = module.exports = Programador;
    
