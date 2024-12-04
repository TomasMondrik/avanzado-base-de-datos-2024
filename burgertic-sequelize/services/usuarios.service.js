import { Usuarios } from '../models/usuarios.model.js';

const getUsuarioByEmail = async (email) => {
    return await Usuarios.findOne({ where: { email } });
};

const getUsuarioById = async (id) => {
    return await Usuarios.findByPk(id);
};

const createUsuario = async (usuario) => {
    return await Usuarios.create(usuario);
};

export default {
    getUsuarioByEmail,
    getUsuarioById,
    createUsuario,
};
