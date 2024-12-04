import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const register = async (req, res) => {
    try {
        // 1. Verificar que el body de la request tenga los campos nombre, apellido, email y password
        const { nombre, apellido, email, password } = req.body;
        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({ message: "Faltan campos obligatorios." });
        }

        // 3. Verificar que no exista un usuario con el mismo email
        const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ message: "El usuario ya existe." });
        }

        // 5. Hashear la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 6. Guardar el usuario en la base de datos
        const nuevoUsuario = {
            nombre,
            apellido,
            email,
            password: hashedPassword, // Guardamos la contraseña hasheada
        };

        const usuarioGuardado = await UsuariosService.createUsuario(nuevoUsuario);

        // 7. Devolver un mensaje de éxito si todo salió bien
        res.status(201).json({ message: "Usuario creado con éxito.", usuario: usuarioGuardado });
    } catch (error) {
        // 8. Devolver un mensaje de error si algo falló guardando al usuario
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        // 1. Verificar que el body de la request tenga email y password
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Faltan email o contraseña." });
        }

        // 2. Buscar un usuario con el email recibido
        const usuario = await UsuariosService.getUsuarioByEmail(email);
        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado." });
        }

        // 4. Verificar que la contraseña recibida sea correcta
        const esPasswordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esPasswordCorrecta) {
            return res.status(400).json({ message: "Contraseña incorrecta." });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
            expiresIn: "1h", 
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso.",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
            },
            token,
        });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};

export default { register, login };
