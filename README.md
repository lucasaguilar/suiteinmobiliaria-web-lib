# WorkspaceLibrarySuiteinmobiliaria

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


Library: SuiteinmobiliariaWebLib
=======

Librería desarrollada en Angular 8.x para obtener los datos públicos de las propiedades de una instancia de Suite Inmobiliaria. 

Datos de configuración de la librería:

~~~javascript
    @Inject('apiBaseUrl') apiBaseUrl: string,
    @Inject('apiKey') apiKey: string,
    @Inject('entidad') entidad: number,
    @Inject('apiInmuebles') apiInmuebles: string,
    @Inject('apiContacto') apiContacto: string,
    @Inject('hashForStorageNoticias') 
~~~

Cargar la librería en su proyecto
-------------------

En la carpeta dist, tiene que estar el build de la librería para realizar el build
de la app web. Por ejemplo:

dist/{carpetaBuildDeTuProyecto}
dist/suiteinmobiliaria-web-lib (librería externa)


Seteo de parámetros
-------------------

En app.module.ts setear la información del archivo environment.nombreCliente por ejemplo:

~~~ts
providers: [
    {
      provide: 'apiBaseUrl', useValue: environment.apiBaseUrl
    },
    {
      provide: 'apiKey', useValue: environment.apiKey
    },
    {
      provide: 'entidad', useValue: environment.entidad
    },
    {
      provide: 'hashForStorageNoticias', useValue: environment.hashForStorageNoticias
    },
    {
      provide: 'apiContacto', useValue: environment.apiContacto
    },
    {
      provide: 'apiInmuebles', useValue: environment.apiInmuebles
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
~~~



