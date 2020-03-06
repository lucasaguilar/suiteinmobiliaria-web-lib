
import { ImagenNoticia } from './imagen-noticia.model';

export interface Noticia {

    id: number;
    titulo: string; // nombre
    descripcion: string;
    publicado: number; // 1 si 0 no
    imagen: ImagenNoticia;
    link: string; // null o link
    entId: number;
    fechaHora: string; // '2020-02-15 18:15:52';
    destacado: boolean; // 1
    orden: number;  // null o number
    fechaBaja: Date;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    fechaLimite: Date;
    atributos: {
        'contenido': string
    };
}

// http://localhost/isimultanea-rest-ful/src/services/web/app_dev.php/contenidos?apikey=OTHMSgTSEhMLcWGQ

// modelo de ejemplo:
const contenidosMockups = {
    total: 1,
    contenidos: {
        1919: {
            cont_id: 1919,
            cont_tcont_id: 50,
            cont_nombre: 'Novedad numero 1 para bosco',
            cont_descripcion: 'Copete de la novedada o noticia',
            cont_publicado: 1,
            cont_imagen: '',
            cont_link: null,
            cont_ent_id: 1,
            cont_fecha_hora: '2020-02-15 18:15:52',
            cont_destacado: 1,
            cont_orden: null,
            cont_fecha_baja: null,
            cont_seo_title: null,
            cont_seo_description: null,
            cont_seo_keywords: null,
            cont_fecha_limite: null,
            atributos: {
                Contenido: '<p>Datos loremp insupa aslkdjas aslkdj alskjd asl dkals dklasj d</p><p>de la noticia de bosco.-</p>'
            }
        }
    }
};
