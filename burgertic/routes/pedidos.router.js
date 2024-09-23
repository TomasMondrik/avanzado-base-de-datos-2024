import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

// Obtener todos los pedidos (Solo accesible por un admin)
router.get("/", verifyToken, verifyAdmin, PedidosController.getPedidos);

// Obtener los pedidos de un usuario (Accesible por cualquier usuario autenticado)
router.get("/usuario", verifyToken, PedidosController.getPedidosByUser);

// Obtener un pedido por id (Accesible por cualquier usuario autenticado)
router.get("/:id", verifyToken, PedidosController.getPedidoById);

// Crear un nuevo pedido (Accesible por cualquier usuario autenticado)
router.post("/", verifyToken, PedidosController.createPedido);

// Aceptar un pedido (Solo accesible por un admin)
router.put("/:id/aceptar", verifyToken, verifyAdmin, PedidosController.aceptarPedido);

// Comenzar un pedido (Solo accesible por un admin)
router.put("/:id/comenzar", verifyToken, verifyAdmin, PedidosController.comenzarPedido);

// Entregar un pedido (Solo accesible por un admin)
router.put("/:id/entregar", verifyToken, verifyAdmin, PedidosController.entregarPedido);

// Eliminar un pedido (Solo accesible por un admin)
router.delete("/:id", verifyToken, verifyAdmin, PedidosController.deletePedido);

export default router;