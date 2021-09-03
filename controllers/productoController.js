const models = require("../models");
const Producto = models.Producto;

var productoController = {};

/* Get All */
productoController.getAll = function (req, res) {
  Producto.findAll().then(productos => {
    res.status(200).json({
      success: true,
      productos
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      success: false,
      error
    })
  });
};

/* Add */
productoController.add = function (req, res) {
  let reqProducto = req.body
  Producto.create(reqProducto).then(producto => {
      res.status(200).json({
        success: true,
        ...producto
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Error al agregar un registro",
        ...producto
      });
    });
};


/* Get by Id */
productoController.get = function (req, res) {
  Producto.findByPk(req.params.id).then(producto => {
    if (producto) {
      res.status(200).json({
        success: true,
        ...producto
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Registro no encontrado"
      });
    }
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      success: false,
      error
    })
  });
};

/* Update By Id */
productoController.update = function (req, res) {
  reqproducto = req.body
  Producto.findByPk(req.params.id).then(producto => {
    if (producto) {
      producto.update(reqproducto).then(producto => {
        res.status(200).json({
          success: true,
          ...producto
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          success: false,
          error: "Error al actualizar registro"
        })
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Registro no encontrado"
      });
    }
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      success: false,
      error
    })
  });;
};

/* Delete by Id */
productoController.delete = function (req, res) {
  Producto.destroy({
      where: {
        productoId: req.params.id
      }
    }).then(async () => {
      res.status(200).json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error
      })
    });
};




module.exports = productoController;