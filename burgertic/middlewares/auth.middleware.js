import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
               try {
                // 1. Verificar si hay un token en los headers de autorización
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    return res.status(401).json({ message: "Token no proporcionado o en formato incorrecto" });
                }
        
                // 2. Extraer el token
                const token = authHeader.split(" ")[1];
        
                // 3. Verificar que el token sea válido
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ message: "Token no válido" });
                    }
        
                    // 4. Verificar que tenga un id de usuario al decodificarlo
                    if (!decoded || !decoded.id) {
                        return res.status(401).json({ message: "Token no contiene un id de usuario válido" });
                    }
        
                    // Agregar el id de usuario decodificado al objeto request
                    req.userId = decoded.id;
                    next(); // Continuar al siguiente middleware
                });
            } catch (error) {
                return res.status(401).json({ message: "Error al verificar el token" });
            }
        };

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */
            try {
                // 1. Verificar que el id de usuario en la request existe y es administrador
                const usuario = await UsuariosService.getUserById(req.userId);
        
                if (!usuario) {
                    return res.status(403).json({ message: "Usuario no encontrado" });
                }
        
                if (!usuario.isAdmin) {
                    return res.status(403).json({ message: "Acceso denegado, usuario no es administrador" });
                }
        
                // Si es administrador, continuar al siguiente middleware
                next();
            } catch (error) {
                return res.status(403).json({ message: "Error al verificar los permisos de administrador" });
            }
        };
