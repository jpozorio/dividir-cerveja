import {Component} from '@angular/core';
import {Drinker, TableService} from "./table.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public _tableService: TableService,
  ) {
    if (!this._tableService.drinkers || this._tableService.drinkers.length == 0) {
      _tableService.inicializeTable();
      _tableService.addBlankDrinker();
      _tableService.addBlankDrinker();
    }
  }

  addNewDrinker() {
    this._tableService.addBlankDrinker();
  }

  addNewDrinkerIfNecessary() {
    const qtd = this._tableService.drinkers.length;
    const last: Drinker = this._tableService.drinkers[qtd - 1];
    if (last.name) {
      this.addNewDrinker();
      this._tableService.startInChanged();
    }
  }

  deleteDrinker(idx: number) {
    this._tableService.drinkers.splice(idx, 1);
    if (this._tableService.drinkers.length > 0) {
      this._tableService.startInChanged();
    }
  }

  partialPayed($event, drinker: Drinker) {
    if ($event) {
      drinker.end_in = this._tableService.beer_ammount;
    } else {
      drinker.end_in = null;
    }
    this._tableService.startInChanged();
  }
}
