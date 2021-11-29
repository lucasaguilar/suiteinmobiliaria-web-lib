import { Noticia } from './noticia.model';

export class Banner implements Noticia {
    id: number;
    tipoContenido: number;
    titulo: string;
    descripcion: string;
    publicado: number;
    imagen: import('./imagen-noticia.model').ImagenNoticia;
    link: string;
    entId: number;
    fechaHora: string;
    destacado: boolean;
    orden: number;
    fechaBaja: Date;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    fechaLimite: Date;
    atributos: { contenido: any; };
}
