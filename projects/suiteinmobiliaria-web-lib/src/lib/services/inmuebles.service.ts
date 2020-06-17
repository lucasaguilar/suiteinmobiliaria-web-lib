import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { ErrorHandle } from '../services/errorHandle.service';
// models
import { Inmueble } from '../models/inmueble.model';
import { ImagenInmueble } from '../models/imagen-inmueble.model';


@Injectable({
  providedIn: 'root',
})
export class InmuebleService {

  private inmuebles: Inmueble[] = [];
  private inmueblesRemotos: any;
  private apiKey; // = 'OTHMSgTSEhMLcWGQ';
  private urlInmuebles; // = 'https://www.suiteinmobiliaria.com/services/web/inmuebles?apikey=' + this.apiKey;
  private urlContacto; // = 'https://www.suiteinmobiliaria.com/services/web/contacto?apikey=' + this.apiKey;
  private entidad; // = 1;

  constructor(
    private http: HttpClient,
    private errorHandle: ErrorHandle,
    @Inject('apiBaseUrl') apiBaseUrl: string,
    @Inject('apiKey') apiKey: string,
    @Inject('entidad') entidad: number,
    @Inject('apiInmuebles') apiInmuebles: string,
    @Inject('apiContacto') apiContacto: string,
    @Inject('hashForStorageNoticias') hashForStorageNoticias: string,
  ) {

    this.apiKey = apiKey;
    this.entidad = entidad;
    this.urlInmuebles = apiBaseUrl + apiInmuebles + this.apiKey;
    this.urlContacto = apiBaseUrl + apiContacto + this.apiKey;

  }


  getEntidad() {
    return this.entidad;
  }

  getInmueblesRemotos(): Observable<any> {
    return this.http.get<any>(this.urlInmuebles).pipe(
      retry(1),
      catchError(this.errorHandle.triggerError())
    );
  }

  getInmuebles(): Inmueble[] {
    return this.inmuebles;
  }

  getInmueble(id: number) {

    // llega el id de la propiedad
    for (const prop in this.inmuebles) {
      if (prop) {
        if (id === this.inmuebles[prop].id) {
          return this.inmuebles[prop];
        }
      }
    }

  }

  buscarInmueble(datos: any): Inmueble[] {

    const inmueblesArr: Inmueble[] = [];

    datos.q = datos.q.trim().toLowerCase();
    datos.tipoPropiedad = datos.tipoPropiedad.trim().toLowerCase();
    datos.operacion = datos.operacion.trim().toLowerCase();

    for (let i = 0; i < this.inmuebles.length; i++) {

      const inmueble = this.inmuebles[i];

      const nombre = inmueble.descripcion.toLowerCase();
      const titulo = inmueble.titulo.toLowerCase();
      const tipo = inmueble.tipo.toLowerCase();
      const operacion = inmueble.operacion.toLowerCase();

      let agregarInmueblePorCadena = false;
      let agregarInmueblePorOperacion = false;
      let agregarInmueblePorTipo = false;

      if (datos.q !== '') {
        if (
          (nombre.indexOf(datos.q) >= 0) ||
          (titulo.indexOf(datos.q) >= 0) ||
          (tipo.indexOf(datos.q) >= 0) ||
          (operacion.indexOf(datos.q) >= 0)
        ) {
          agregarInmueblePorCadena = true;
        } else {
          agregarInmueblePorCadena = false;
        }
      } else {
        agregarInmueblePorCadena = true;
      }

      if (datos.operacion !== '') {
        if (datos.operacion === operacion) {
          agregarInmueblePorOperacion = true;
        } else {
          agregarInmueblePorOperacion = false;
        }
      } else {
        agregarInmueblePorOperacion = true;
      }


      if (datos.tipoPropiedad !== '') {
        if (datos.tipoPropiedad === tipo) {
          agregarInmueblePorTipo = true;
        } else {
          agregarInmueblePorTipo = false;
        }
      } else {
        agregarInmueblePorTipo = true;
      }

      // tslint:disable-next-line:max-line-length
      if (agregarInmueblePorCadena === true && agregarInmueblePorOperacion === true && agregarInmueblePorTipo === true) {
        // si lo encuentra lo agregago al array temporal de busqueda
        inmueble.indice = i;
        inmueblesArr.push(inmueble);
      }
    }

    return inmueblesArr;
  }

  setInmuebles(inmueblesRemotos: any[]) {

    this.inmuebles = [];

    let limite = 0;

    // mapeo los datos remotos
    // tslint:disable-next-line:forin
    for (const prop in inmueblesRemotos) {

      // @todo luego quitar este limite porque es solo para mostrar menos propiedades en la maqueta      
      /*
      if (limite <= 11) {
        limite++;
      } else {
        break;
      }
      */

      const id = inmueblesRemotos[prop].inm_id; // prop;
      const titulo = inmueblesRemotos[prop].inm_direccion;
      const operacion = inmueblesRemotos[prop].ope_nombre;
      const tipo = inmueblesRemotos[prop].tipo_nombre;
      const ubicacion = [inmueblesRemotos[prop].inm_latitud, inmueblesRemotos[prop].inm_longitud];

      const img: ImagenInmueble[] = [];
      const arrayFotosInmueble = inmueblesRemotos[prop].fotos;

      // tslint:disable-next-line:forin
      for (const indiceImagen in arrayFotosInmueble) {

        const ruta = arrayFotosInmueble[indiceImagen].foto_url;
        const nombre = arrayFotosInmueble[indiceImagen].foto_id;
        const miniatura = arrayFotosInmueble[indiceImagen].foto_url_slide;

        const imagenesTemporal = {
          ruta: ruta,
          nombre: nombre,
          miniatura: miniatura
        };

        img.push(imagenesTemporal);

      }

      const precio = (
        inmueblesRemotos[prop].inm_precio_publicar === '' ||
        inmueblesRemotos[prop].inm_precio_publicar === null ||
        inmueblesRemotos[prop].inm_precio_publicar === 0 ||
        inmueblesRemotos[prop].inm_precio_publicar === '0'
      ) ? '$ Consultar' : inmueblesRemotos[prop].inm_precio;

      // U$S dolar o $ peso argentino o nada
      // No muestro la moneda si el precio es a consultar
      const moneda = (
        precio === '$ Consultar'
      ) ? '' : inmueblesRemotos[prop].mon_descripcion;

      const descripcion = inmueblesRemotos[prop].inm_descripcion;
      const superficie = inmueblesRemotos[prop].inm_sup_cubierta;
      const parcela = inmueblesRemotos[prop].inm_superficie;
      const indice = prop;

      const direccion = inmueblesRemotos[prop].inm_direccion;
      const localidad = inmueblesRemotos[prop].localidad_nombre;
      const departamento = inmueblesRemotos[prop].departamento_nombre;
      const provincia = inmueblesRemotos[prop].provincia_nombre;

      const latitud = inmueblesRemotos[prop].inm_latitud === '' ||
        inmueblesRemotos[prop].inm_latitud === null ?
        0 : inmueblesRemotos[prop].inm_latitud;

      const longitud = inmueblesRemotos[prop].inm_longitud === '' ||
        inmueblesRemotos[prop].inm_longitud === null ?
        0 : inmueblesRemotos[prop].inm_longitud;

      const inmuebleTemporal = {
        id: +id,
        titulo: titulo,
        operacion: operacion,
        tipo: tipo,
        ubicacion: '', // @todo es un array con latitud y longitud
        img: img,
        precio: precio,
        moneda: moneda,
        descripcion: descripcion,
        superficie: superficie,
        parcela: parcela,
        direccion: direccion,
        localidad: localidad,
        departamento: departamento,
        provincia: provincia,
        latitud: latitud,
        longitud: longitud,
        indice: +id // @deprecated, ver este indice, creo que no es mas necesario???
      };
      this.inmuebles.push(inmuebleTemporal);
    }
  }

  /*
    guardarStorage() {
      // antes de guardar en el storage lo paso a string al array de objetos
      sessionStorage.setItem('inmuebles', JSON.stringify(this.inmueblesRemotos));
    }
  */

  guardarStorage(data: any) {
    // antes de guardar en el storage lo paso a string al array de objetos
    sessionStorage.setItem('inmuebles' + this.entidad, JSON.stringify(data));
  }

  cargarStorage() {

    if (sessionStorage.getItem('inmuebles' + this.entidad)) {
      return JSON.parse(sessionStorage.getItem('inmuebles' + this.entidad));
    } else {
      // @todo manejar exeption si falla la llamada http
      return this.getInmueblesRemotos(); //.subscribe((data: any) => {
      // this.guardarStorage(data);
      // });
    }

  }

  /**
   * Envia datos del formulario de contacto
   * @param data
   */
  contacto(data: any): Observable<any> {
    console.log('enviando datos mockup');
    // @todo se crea este mockup de observable para simular la respuesta json del server de contacto

    /*
    const simpleObservable = new Observable((observer) => {
      // observable execution
      observer.next({ message: 'Datos enviados correctamente...' });
      observer.complete();
    });
    return simpleObservable;
    */
    return this.http.post(this.urlContacto, data);
  }
}
