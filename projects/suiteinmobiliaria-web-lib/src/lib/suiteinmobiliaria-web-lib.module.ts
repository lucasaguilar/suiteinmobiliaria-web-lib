import { NgModule } from '@angular/core';
import { SuiteinmobiliariaWebLibComponent } from './suiteinmobiliaria-web-lib.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [SuiteinmobiliariaWebLibComponent],
  imports: [
    HttpClientModule
  ],
  exports: [SuiteinmobiliariaWebLibComponent]
})
export class SuiteinmobiliariaWebLibModule { }
