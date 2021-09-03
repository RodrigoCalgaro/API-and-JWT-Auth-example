'use strict';

module.exports = (sequelize, DataTypes) => {
    var Producto = sequelize.define('Producto', {
        productoId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        codigo: {
            type: DataTypes.INTEGER
        },
        nombre: {
            type: DataTypes.STRING,
        },
        marca: {
            type: DataTypes.STRING,
        },
        proveedor: {
            type: DataTypes.STRING,
        }

    }, {
        timestamps: false,
    }, );

    Producto.associate = function (models) {};

    return Producto;
};