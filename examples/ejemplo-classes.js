/* Object  */
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(`${this.nombre} hace ruido.`);
  }

  comer() {
      console.log(`${this.nombre} come.`);
  }

  moverse() {
      console.log(`${this.nombre} moviendose.`);
  }
}


class Perro extends Animal {
  constructor(nombre, raza) {
      super(nombre);
      this.raza = raza;
  }

  hablar() {
      super.hablar();
      console.log(`${this.nombre} hace guau guau.`);
  }

  comer() {
      console.log(`${this.nombre} come croquetas.`);
  }
}

const simba = new Animal('Simba');
console.log('Objeto simba', simba);

simba.hablar();
simba.comer();
simba.moverse();

console.log('---------------');
const nala = new Animal('Nala');
console.log('Objeto nala', nala);
nala.hablar();
nala.comer();

console.log('---------------');

const dobby = new Perro('Dobby', 'French');
console.log('Objeto dobby', dobby);
dobby.hablar();
dobby.comer();
dobby.moverse();
