var Escuchadores = {};

class EventEmitter {
    constructor(){
        this.Escuchadores = Escuchadores;
    }

    on(evento, metodo){
        this.evento = evento;
        this.metodo = metodo;
        
        //Esta funciona para un evento -> una función
        //this.Escuchadores[this.evento] = this.metodo;

        //Esta buscaría ser genérica con (un evento -> Muchas funciones) 
        //Se asigna un array vacio si y sólo si no ha sido definido el evento
        if (this.Escuchadores[this.evento] === undefined){
            this.Escuchadores[this.evento] =[];
        }
        this.Escuchadores[this.evento].push(this.metodo);

        //Otra forma de definir el objeto a incluir en el array que fue descartado...
        //Object.defineProperty(this.Escuchadores, 
        //    this.evento, {value: this.metodo}
        //    );
    }


//La función Emit permite emitir la función según el elemento recibido 
//y pasar los argumentos necesarios 

    emit(evento, ...args){
        this.evento = evento;
        this.argumentos = args;

        //Para efectos de la depuracion
        //console.log(evento +"&&"+ args)

        //Ejecuto un ciclo que busca cada función agregada en el array y la ejecuta pasandole los argumentos del evento

        this.Escuchadores[evento].forEach(element => {
            this.func_escuchadora = element;
            //Ejecuto la función Callback pasandole los argumentos.
            this.func_escuchadora(this.argumentos);
        })

        



    }


}

exports = module.exports = EventEmitter;