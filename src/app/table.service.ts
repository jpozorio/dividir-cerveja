import {Injectable} from "@angular/core";

export class Drinker {
  name: string;
  start_in: number;
  end_in?: number;
  ammout_drinked: number = 0;
  should_pay?: number;
  partial_payed: boolean = false;

}

@Injectable()
export class TableService {
  drinkers: Drinker[];
  beer_ammount: number = 1;
  beer_unit_value: number = 0;
  includeTip: boolean = true;

  addBlankDrinker() {
    this.drinkers.push(
      {
        name: '',
        ammout_drinked: 0,
        start_in: 1,
        partial_payed: false
      }
    )
  }

  inicializeTable() {
    this.drinkers = [];
  }

  billValue(): number {
    return (this.beer_ammount * this.beer_unit_value) * (this.includeTip ? 1.1 : 1);
  }

  addBeer() {
    this.beer_ammount++;
  }

  rmBeer() {
    this.beer_ammount-- ;
  }
}
