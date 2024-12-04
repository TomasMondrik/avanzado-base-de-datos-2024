import { Plato } from '../models/platos.model.js';

const getPlatos = async () => {
    return await Plato.findAll();
};

const getPlatoById = async (id) => {
    return await Plato.findByPk(id);
};

const createPlato = async (plato) => {
    return await Plato.create(plato);
};

const updatePlato = async (id, newData) => {
    const plato = await Plato.findByPk(id);
    if (!plato) throw new Error("Plato no encontrado");
    
    await plato.update(newData);
    return plato;
};

const deletePlato = async (id) => {
    const plato = await Plato.findByPk(id);
    if (!plato) throw new Error("Plato no encontrado");
    
    await plato.destroy();
    return plato;
};

const getPlatosByTipo = async (tipo) => {
    return await Plato.findAll({ where: { tipo } });
};

export default {
    getPlatos,
    getPlatoById,
    createPlato,
    updatePlato,
    deletePlato,
    getPlatosByTipo,
};
