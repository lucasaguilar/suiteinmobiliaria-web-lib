import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { ErrorHandle } from '../services/errorHandle.service';

import { environment, apiKey, entidad, hashForStorageNoticias } from '../../environments/environment';
import { Noticia } from '../models/noticia.model';


/**
 * Para obtener los contenidos del gestor de contenidos
 * Suite IS
 */
@Injectable({ providedIn: 'root' })
export class ContenidosService {

    private noticias: Noticia[] = [];
    private noticiasRemotas: any;

    constructor(
        private httpClient: HttpClient,
        private errorHandle: ErrorHandle
    ) { }

    /**
     * Antes de guardar en el session storage lo paso
     * a string al array de objetos
     * @param data json de listado de contenidos
     */
    guardarStorage(data: any) {
        sessionStorage.setItem(hashForStorageNoticias + entidad, JSON.stringify(data));
    }

    /**
     * Este metodo es llamado por el resolver para obtener los
     * datos via url o via session storage
     */
    getContenidos() {

        if (sessionStorage.getItem(hashForStorageNoticias + entidad)) {
            return JSON.parse(sessionStorage.getItem(hashForStorageNoticias + entidad));
        } else {

            return this.getContenidosRemotos();
        }
    }

    /**
     * Obtiene el json de contenidos desde el api
     */
    getContenidosRemotos(): Observable<any> {
        return this.httpClient.get<any>(environment.apiBaseUrl + environment.apiContenidos).pipe(
            retry(1),
            catchError(this.errorHandle.triggerError())
        );
    }

    /**
     * Guardo las noticias en el storage
     * @param beneficios json de listado de contenidos/noticias remotos
     */
    guardarContenidosStorage(noticias: any) {
        sessionStorage.setItem(
            hashForStorageNoticias + entidad,
            JSON.stringify(noticias)
        );
    }

    /**
     * Verifica si existen noticias en el sessionStorage 
     */
    checkNoticiasStorage() {

        if (sessionStorage.getItem(hashForStorageNoticias + entidad)) {
            // ya estan guardados en el sessionStorage
            return true;
        } else {
            // retorno false para que sean guardados
            return false;
        }
    }


    getNoticias(noticias: any): any[] {

        let noticiasArray = [];

        // si no estan guardados en el storage los guardo
        if (this.checkNoticiasStorage() === false) {
            this.guardarNoticiasStorage(noticias); // json que se guarda en el storage
        }

        if (noticias.contenidos !== undefined) {
            // array de contenidos para setear el modelo
            noticiasArray = (Object.values(noticias.contenidos));

            for (const key in noticiasArray) {

                if (noticiasArray.hasOwnProperty(key)) {

                    const contenidoTmp: Noticia = {
                        id: noticiasArray[key].cont_id,
                        atributos: null, // { contenido: 'asdasdasdasd' },
                        descripcion: noticiasArray[key].descripcion,
                        destacado: noticiasArray[key].destacado,
                        entId: null,
                        fechaBaja: null,
                        fechaHora: null,
                        fechaLimite: null,
                        imagen: null,
                        link: null,
                        orden: null,
                        publicado: null,
                        seoDescription: null,
                        seoKeywords: null,
                        seoTitle: null,
                        titulo: null

                    };

                    // array de noticias a retornar
                    this.noticias.push(contenidoTmp);

                }

            }

        }

        return this.noticias;
    }


    /**
     * Guardo los beneficios en el storage
     * @param beneficios json de listado de beneficios remotos
     */
    guardarNoticiasStorage(noticias: any) {

        sessionStorage.setItem(
            hashForStorageNoticias,
            JSON.stringify(noticias)
        );
    }

}
