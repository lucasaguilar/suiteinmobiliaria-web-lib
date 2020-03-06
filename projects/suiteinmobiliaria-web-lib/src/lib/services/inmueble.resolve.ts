import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InmuebleService } from './inmuebles.service';
import { Inmueble } from '../models/inmueble.model';

@Injectable({
    providedIn: 'root',
})
export class InmuebleResolve implements Resolve<Observable<Inmueble[]>> {

    constructor(private inmuebleService: InmuebleService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        // console.log('inmueble.resolve ' + route.paramMap.get('id'));
        return this.inmuebleService.cargarStorage();
    }
}
