import { sequelize } from "../db.js";
import { Pedidos } from "./pedidos.model.js"
import { Plato } from "./platos.model.js";
import { PlatosxPedidos } from "./platosxpedidos.model.js";
import { Usuarios } from "./usuarios.model.js"

export const defModelos = async()=>{
    Pedidos.belongsTo(Usuarios, { foreignKey: 'UsuarioId' });
    Usuarios.hasMany(Pedidos,{ foreignKey: 'UsuarioId' });
    Pedidos.belongsToMany(Plato, {through: PlatosxPedidos,
        foreignKey: 'PedidoId',
        otherKey: 'platoId',
        as: 'platos',});
    Plato.belongsToMany(Pedidos, {through: PlatosxPedidos,
        foreignKey: 'platoId',
        otherKey: 'PedidoId',
        as: 'pedidos',});
        console.log("Pase x defModelos");
    //await sequelize.sync({force: true, alter: true})
    //await sequelize.sync({ alter: true });
}  
console.log("Pase x aca");