import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiKey;
  private urlInmuebles; // = 'https://www.suiteinmobiliaria.com/services/web/inmuebles?apikey=' + this.apiKey;
  private urlContacto; // = 'https://www.suiteinmobiliaria.com/services/web/contacto?apikey=' + this.apiKey;
  private entidad;

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
      const id = inmueblesRemotos[prop].inm_id; // prop;
      const codigo = inmueblesRemotos[prop].inm_cod; // codigo interno de la propiedad
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

      const banios =
        inmueblesRemotos[prop].inm_banios === 0 ||
          inmueblesRemotos[prop].inm_banios === '0' ||
          inmueblesRemotos[prop].inm_banios === null ||
          inmueblesRemotos[prop].inm_banios === '' ?
          '' : inmueblesRemotos[prop].inm_banios;

      const dormitorios =
        inmueblesRemotos[prop].inm_dormitorios === 0 ||
          inmueblesRemotos[prop].inm_dormitorios === '0' ||
          inmueblesRemotos[prop].inm_dormitorios === null ||
          inmueblesRemotos[prop].inm_dormitorios === '' ?
          '' : inmueblesRemotos[prop].inm_dormitorios;

      const cocheras =
        inmueblesRemotos[prop].inm_cocheras === 0 ||
          inmueblesRemotos[prop].inm_cocheras === '0' ||
          inmueblesRemotos[prop].inm_cocheras === '' ||
          inmueblesRemotos[prop].inm_cocheras === null ?
          '' : inmueblesRemotos[prop].inm_cocheras;

      const inmuebleTemporal = {
        id: +id,
        codigo: codigo,
        titulo: titulo,
        operacion: operacion,
        tipo: tipo,
        ubicacion: '', // array con latitud y longitud
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
        dormitorios: banios,
        banios: dormitorios,
        cocheras: cocheras,
        indice: +id // @deprecated, ver este indice, creo que no es mas necesario???
      };
      this.inmuebles.push(inmuebleTemporal);
    }
  }

  guardarStorage(data: any) {
    sessionStorage.setItem('inmuebles' + this.entidad, JSON.stringify(data));
  }

  cargarStorage() {

    if (sessionStorage.getItem('inmuebles' + this.entidad)) {
      return JSON.parse(sessionStorage.getItem('inmuebles' + this.entidad));
    } else {
      // @todo manejar exeption si falla la llamada http
      return this.getInmueblesRemotos(); // .subscribe((data: any) => {
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
