import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

router.get("/", verifyToken, verifyAdmin, PedidosController.getPedidos);

router.get("/usuario", verifyToken, PedidosController.getPedidosByUser);

router.get("/:id", verifyToken, PedidosController.getPedidoById);

router.post("/", verifyToken, PedidosController.createPedido);

router.put("/aceptar/:id", verifyToken, verifyAdmin, PedidosController.aceptarPedido);

router.put("/comenzar/:id", verifyToken, verifyAdmin, PedidosController.comenzarPedido);

router.put("/entregar/:id", verifyToken, verifyAdmin, PedidosController.entregarPedido);

router.delete("/:id", verifyToken, verifyAdmin, PedidosController.deletePedido);

export default router;