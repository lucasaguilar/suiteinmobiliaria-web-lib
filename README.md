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

- Datos de configuración de la librería:

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

- En el archivo angular.json agregar las referencias al proyecto de la librería

~~~json
    "lib-web-suiteinmobiliaria": {
      "projectType": "library",
      "root": "projects/lib-web-suiteinmobiliaria",
      "sourceRoot": "projects/lib-web-suiteinmobiliaria/src",
      "prefix": "lib",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-ng-packagr:build",
          "options": {
            "tsConfig": "projects/lib-web-suiteinmobiliaria/tsconfig.lib.json",
            "project": "projects/lib-web-suiteinmobiliaria/ng-package.json"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "projects/lib-web-suiteinmobiliaria/src/test.ts",
            "tsConfig": "projects/lib-web-suiteinmobiliaria/tsconfig.spec.json",
            "karmaConfig": "projects/lib-web-suiteinmobiliaria/karma.conf.js"
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "projects/lib-web-suiteinmobiliaria/tsconfig.lib.json",
              "projects/lib-web-suiteinmobiliaria/tsconfig.spec.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        }
      }
    }}
~~~


- En la carpeta dist de su proyecto angular, tiene que estar el build/paquete de la librería para realizar el build de la app web. Por ejemplo:

dist/{carpetaBuildDeTuProyecto}
dist/suiteinmobiliaria-web-lib (librería externa)

Seteo de parámetros dentro de tu aplicación
-------------------

En app.module.ts de tu proyecto setear la información en un archivo environment.nombreCliente por ejemplo de la siguiente manera:

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

Esta librería se puede utilizar para integrarse a desarrollos de portales web inmobiliarios para conectarse a productos de suiteinmobiliaria.com con las credenciales correspondientes. Tambien se puede utilizar el modelo general de desarrollo de esta librería para un uso general si se modifica el origen de datos, parámetros, modelos de datos, para poder integrarlos a cualquier aplicación desarrollada en angular 8.x o superior.

enjoy coding !!!
---------------