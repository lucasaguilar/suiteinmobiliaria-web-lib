import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class ErrorHandle {

    constructor() {
    }

    public triggerError() {
        return this.handleError;
    }

    /**
    * @param error para el manejo de errores http
    */
    handleError(error: any) {

        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error capturado desde el cliente: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code, capturado desde el servidor: ${error.status}\nMessage: ${error.message}`;
        }

        // @todo redirijir al usuario a otra pantalla? o dar aviso de otra acción?

        window.alert(errorMessage);
        return throwError(errorMessage);
    }

}
