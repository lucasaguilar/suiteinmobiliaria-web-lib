import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContenidosService } from './contenidos.service';
import { Noticia } from '../models/noticia.model';

@Injectable({
    providedIn: 'root',
})
export class ContenidosResolve implements Resolve<Observable<Noticia[]>> {

    constructor(private contenidosService: ContenidosService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        // console.log('contenidos.resolve ' + route.paramMap.get('id'));
        return this.contenidosService.getContenidos();
    }
}