import { Pedidos } from '../models/pedidos.model.js';
import { Plato } from '../models/platos.model.js';
import { PlatosxPedidos as PlatosXPedidos } from '../models/platosxpedidos.model.js';
import { Usuarios } from '../models/usuarios.model.js';

const getPlatosByPedido = async (idPedido) => {
    const platosXPedidos = await PlatosXPedidos.findAll({
        where: { id_pedido: idPedido },
        //include: [{ model: Plato }],
    });

    return platosXPedidos.map(p => ({
        id: p.Plato.id,
        nombre: p.Plato.nombre,
        cantidad: p.cantidad,
    }));
};

const getPedidos = async () => {
    const pedidos = await Pedidos.findAll({
        include: [
            {
                model: Plato,
                as: "platos",
                attributes: ["id", "tipo", "nombre", "precio", "descripcion"],
            },
            {
                model: PlatosXPedidos,
                as: "platosxpedidos", 
                attributes: ["cantidad"], 
            }, 
        ],
        attributes: ["id", "fecha", "estado", "UsuarioId"],  
    });

    return pedidos;
};

const getPedidoById = async (id) => {
    const pedido = await Pedidos.findOne({
        where: { id },
       // include: [{ model: PlatosXPedidos, include: [Plato] }],
    });
    const platos = pedido.getPlatos()
    return pedido;
};

const getPedidosByUser  = async (UsuarioId) => {
    const pedidos = await Pedidos.findAll({
        where: { UsuarioId: UsuarioId },
       // include: [{ model: PlatosXPedidos, include: [Plato] }],
    });
    return pedidos;
};

const createPedido = async (idUsuario, platos) => {
    for (let plato of platos) {
        await PlatosXPedidos.create({
            PedidoId: pedido.id, 
            platoId: plato.id,
            cantidad: plato.cantidad,
        });
    }
    
    return pedido;

  return pedido;
};

const updatePedido = async (id, estado) => {

    try {
        if (estado !== "aceptado" && estado !== "en camino" && estado !== "entregado") {
        throw new Error("Estado inválido");
        }
        
        const pedido = await Pedidos.findByPk(id);
        if(!pedido){
            throw new Error("Pedido no encontrado")
        }
        
        const updatePedido = await Pedidos.update (
            {
                estado: estado,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        return updatePedido;
    }
    catch(error){
        throw error;
    }

};

const deletePedido = async (id) => {
    const pedido = await Pedidos.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");
    
    await pedido.destroy();
    return pedido;
};

export default {
   getPedidoById,
    getPedidos,
    getPedidoById,
    getPedidosByUser ,
    createPedido,
    updatePedido,
    deletePedido,
};