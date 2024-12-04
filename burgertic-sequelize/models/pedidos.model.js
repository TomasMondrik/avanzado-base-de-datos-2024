import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Pedidos extends Model {}

Pedidos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha: {
            type: DataTypes.DATE,
        },
        estado: {
            type: DataTypes.STRING,
        },
        UsuarioId: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: "Pedidos",
        timestamps: false,
    }
);