class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName = () => {
    return `Mi nombre completo es ${this.nombre} ${this.apellido}`;
  };

  addMascota = (mascota) => {
    this.mascotas.push(mascota);
  };

  countMascota = () => {
    return this.mascotas.length;
  };

  addBook = (libro) => {
    this.libros.push({ nombre: libro.nombre, autor: libro.autor });
  };

  getBookNames = () => {
    return this.libros.map((libro) => libro.nombre);
  };
}

let usuario1 = new Usuario(
  "Juan",
  "Perez",
  [
    { nombre: "El señor de los anillos", autor: "J.R.R. Tolkien" },
    { nombre: "El señor de los anillos 2", autor: "J.R.R. Tolkien" },
  ],
  ["Perro", "Gato"]
);

console.log(usuario1);
console.log("getFullName", usuario1.getFullName());
console.log("addMascota", usuario1.addMascota("Jirafa"));
console.log("countMascota", usuario1.countMascota());
console.log(
  "addBook",
  usuario1.addBook({
    nombre: "El señor de los anillos 3",
    autor: "J.R.R. Tolkien",
  })
);
console.log("getBookNames", usuario1.getBookNames());
