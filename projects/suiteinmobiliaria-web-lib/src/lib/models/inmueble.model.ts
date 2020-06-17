import { ImagenInmueble } from './imagen-inmueble.model';

export interface Inmueble {

    id: number;
    titulo: string;
    operacion: string;
    tipo: string;
    ubicacion: string;
    img: ImagenInmueble[];
    precio: string;
    moneda: string;
    descripcion: string;
    superficie: string;
    parcela: string;
    direccion: string;
    localidad: string;
    departamento: string;
    provincia: string;
    latitud: number;
    longitud: number;
    indice?: number; // el signo de pregunta es para indicar que este atributo es opcional
  }
