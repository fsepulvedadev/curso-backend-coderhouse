const express = require("express");
const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(
        [
          {
            title: "teclado",
            price: 23,
            thumbnail: "http://google.com",
            id: 1,
          },
          {
            title: "mouse",
            price: 50,
            thumbnail: "http://google.com",
            id: 2,
          },
          {
            title: "monitor",
            price: 1500,
            thumbnail: "http://google.com",
            id: 3,
          },
          {
            title: "teclado",
            price: 23,
            thumbnail: "http://google.com",
            id: 4,
          },
          {
            title: "mouse",
            price: 50,
            thumbnail: "http://google.com",
            id: 5,
          },
          {
            title: "monitor",
            price: 1500,
            thumbnail: "http://google.com",
            id: 6,
          },
          {
            title: "teclado",
            price: 23,
            thumbnail: "http://google.com",
            id: 7,
          },
          {
            title: "mouse",
            price: 50,
            thumbnail: "http://google.com",
            id: 8,
          },
          {
            title: "monitor",
            price: 1500,
            thumbnail: "http://google.com",
            id: 9,
          },
        ],

        null,
        2
      )
    );
  }

  async save(objetoAGuardar) {
    try {
      //leo el archivo
      let datosAlmacenados = await this.getAll();
      let datosJson = Array.from(datosAlmacenados);

      if (!datosJson) {
        throw new Error("el archivo no tiene el formato valido");
      }

      if (datosJson.length > 0) {
        objetoAGuardar.id = datosJson.length + 1;
      } else {
        objetoAGuardar.id = 1;
      }

      datosJson = [...datosJson, objetoAGuardar];

      //guardo en el archivo el arreglo de elementos.
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(datosJson, null, 2)
      );

      return objetoAGuardar.id;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      let datosAlmacenados = await this.getAll();

      let datosJson = Array.from(datosAlmacenados);
      console.log(datosJson);
      return datosJson.find((objeto) => objeto.id === id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      let datosAlmacenados = await fs.promises.readFile(this.nombreArchivo);
      if (!datosAlmacenados) {
        return null;
      }
      return JSON.parse(datosAlmacenados);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      let datosAlmacenados = await this.getAll();

      let datosJson = Array.from(datosAlmacenados);
      //guardo la cantidad previamente a la potencial eliminacion para saber si debo recalcular los IDs
      const cantidad = datosJson.length;

      //si encuentro el objeto lo elimino
      datosJson = [...datosJson.filter((dato) => dato.id !== id)];

      //si la cantida difiere, un elemento se elimino y debo recalcular los ids
      if (cantidad != datosJson.length) {
        datosJson.forEach((objeto, index) => {
          objeto.id = index + 1;
        });
      }

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(datosJson, null, 2)
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify([], null, 2)
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

const contenedor = new Contenedor("productos.txt");

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log("Server on port " + server.address().port);
});

app.get("/productos", (req, res) => {
  contenedor.getAll().then((content) => {
    res.send(content);
  });
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/productoRandom", async (req, res) => {
  let random = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  contenedor.getById(random).then((data) => {
    res.send(data);
  });
});
