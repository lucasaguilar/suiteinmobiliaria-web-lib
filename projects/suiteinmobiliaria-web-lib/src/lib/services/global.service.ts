import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private showOption = true;

  constructor() { }

  public offShowOptions() {
    this.showOption = false;
    return this.showOption;
  }

  public onShowOptions() {
    this.showOption = true;
    return this.showOption;
  }

  public getShowOption() {
    return this.showOption;
  }

}
