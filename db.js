import fs from "fs";

const path = "./estados.json";

export const leerEstados = () => {
  try {
    if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    const data = fs.readFileSync(path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

export const guardarEstado = (name, nuevosDatos) => {
  const estados = leerEstados();
  estados[name] = nuevosDatos;
  fs.writeFileSync(path, JSON.stringify(estados, null, 2));
};

export const obtenerEstadoUsuario = (name) => {
  const estados = leerEstados();
  return estados[name];
};
