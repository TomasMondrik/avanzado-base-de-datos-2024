import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (_, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener todos los pedidos
            2. Devolver un json con los pedidos (status 200)
            3. Devolver un mensaje de error si algo falló (status 500)
        
    */
                try {
                    const pedidos = await PedidosService.getPedidos();
                    res.status(200).json(pedidos);
                } catch (error) {
                    res.status(500).json({ message: "Error al obtener los pedidos." });
                }
            };
            

const getPedidosByUser = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener los pedidos del usuario
            2. Si el usuario no tiene pedidos, devolver una lista vacía (status 200)
            3. Si el usuario tiene pedidos, devolver un json con los pedidos (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
            try {
                const userId = req.params.userId;
                const pedidos = await PedidosService.getPedidosByUser(userId);
                res.status(200).json(pedidos.length > 0 ? pedidos : []);
            } catch (error) {
                res.status(500).json({ message: "Error al obtener los pedidos del usuario." });
            }
        };

const getPedidoById = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
            try {
                const pedidoId = req.params.id;
                const pedido = await PedidosService.getPedidoById(pedidoId);
                if (pedido) {
                    res.status(200).json(pedido);
                } else {
                    res.status(404).json({ message: "Pedido no encontrado." });
                }
            } catch (error) {
                res.status(500).json({ message: "Error al obtener el pedido." });
            }
};

const createPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
        
    */
            try {
                const { platos } = req.body;
                if (!platos || !Array.isArray(platos) || platos.length === 0) {
                    return res.status(400).json({ message: "El pedido debe contener al menos un plato." });
                }
        
                for (const plato of platos) {
                    if (!plato.id || !plato.cantidad) {
                        return res.status(400).json({ message: "Cada plato debe tener un id y una cantidad." });
                    }
                }
        
                const nuevoPedido = await PedidosService.createPedido(req.user.id, platos);
                res.status(201).json({ message: "Pedido creado con éxito.", pedido: nuevoPedido });
            } catch (error) {
                res.status(500).json({ message: "Error al crear el pedido." });
            }
};

const aceptarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "pendiente"
            4. Si el pedido no está en estado "pendiente", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "pendiente", actualizar el estado del pedido a "aceptado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
                try {
                    const pedidoId = req.params.id;
                    const pedido = await PedidosService.getPedidoById(pedidoId);
                    if (!pedido) {
                        return res.status(404).json({ message: "Pedido no encontrado." });
                    }
            
                    if (pedido.estado !== "pendiente") {
                        return res.status(400).json({ message: "El pedido no está en estado pendiente." });
                    }
            
                    const pedidoActualizado = await PedidosService.updateEstado(pedidoId, "aceptado");
                    res.status(200).json({ message: "Pedido aceptado con éxito.", pedido: pedidoActualizado });
                } catch (error) {
                    res.status(500).json({ message: "Error al aceptar el pedido." });
                }
            };

const comenzarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "aceptado"
            4. Si el pedido no está en estado "aceptado", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "aceptado", actualizar el estado del pedido a "en camino"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
                try {
                    const pedidoId = req.params.id;
                    const pedido = await PedidosService.getPedidoById(pedidoId);
                    if (!pedido) {
                        return res.status(404).json({ message: "Pedido no encontrado." });
                    }
            
                    if (pedido.estado !== "aceptado") {
                        return res.status(400).json({ message: "El pedido no está en estado aceptado." });
                    }
            
                    const pedidoActualizado = await PedidosService.updateEstado(pedidoId, "en camino");
                    res.status(200).json({ message: "Pedido en camino.", pedido: pedidoActualizado });
                } catch (error) {
                    res.status(500).json({ message: "Error al comenzar el pedido." });
                }
            };
            

const entregarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "en camino"
            4. Si el pedido no está en estado "en camino", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "en camino", actualizar el estado del pedido a "entregado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
                try {
                    const pedidoId = req.params.id;
                    const pedido = await PedidosService.getPedidoById(pedidoId);
                    if (!pedido) {
                        return res.status(404).json({ message: "Pedido no encontrado." });
                    }
            
                    if (pedido.estado !== "en camino") {
                        return res.status(400).json({ message: "El pedido no está en estado en camino." });
                    }
            
                    const pedidoActualizado = await PedidosService.updateEstado(pedidoId, "entregado");
                    res.status(200).json({ message: "Pedido entregado con éxito.", pedido: pedidoActualizado });
                } catch (error) {
                    res.status(500).json({ message: "Error al entregar el pedido." });
                }
            };

const deletePedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, eliminar el pedido
            4. Devolver un mensaje de éxito (status 200)
            5. Devolver un mensaje de error si algo falló (status 500)
        
    */
                try {
                    const pedidoId = req.params.id;
                    const pedido = await PedidosService.getPedidoById(pedidoId);
                    if (!pedido) {
                        return res.status(404).json({ message: "Pedido no encontrado." });
                    }
            
                    await PedidosService.deletePedido(pedidoId);
                    res.status(200).json({ message: "Pedido eliminado con éxito." });
                } catch (error) {
                    res.status(500).json({ message: "Error al eliminar el pedido." });
                }
            };

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};
