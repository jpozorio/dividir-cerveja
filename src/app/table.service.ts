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
    this.startInChanged();
  }

  rmBeer() {
    if (this.beer_ammount > 0) {
      this.beer_ammount--;
      this.startInChanged();
    }
  }

  getTotalAmmount(): number {
    let totalAmmount = 0;
    for (let d of this.drinkers) {
      if (d.start_in > totalAmmount) {
        totalAmmount = d.start_in;
      }
    }
    return totalAmmount;
  }

  startInChanged() {
    const total = this.getTotalAmmount();
    const beerAmmount = this.beer_ammount;
    if (total > beerAmmount || beerAmmount == 0 || total < 0) {
      return;
    }
    let qtdeToSplit = [];
    let drinkers = this.drinkers.filter(d => d.name != '');
    for (let i = 1; i <= beerAmmount; i++) {
      let qtde = 0;
      for (const drinkerCalculating of drinkers) {
        drinkerCalculating.ammout_drinked = 0;
        const end = this.fim(drinkerCalculating, beerAmmount);
        if (i >= drinkerCalculating.start_in && i <= end) {
          qtde++;
        }
      }
      qtdeToSplit[i] = qtde;
    }

    for (let index = 1; index < qtdeToSplit.length; index++) {
      const qtde = qtdeToSplit[index];
      for (const drinkerCalculating of drinkers) {
        const end = this.fim(drinkerCalculating, beerAmmount);
        if (index >= drinkerCalculating.start_in && index <= end) {
          drinkerCalculating.ammout_drinked += 1 / qtde;
        }
      }
    }

    for (const drinkerCalculating of drinkers) {
      drinkerCalculating.should_pay = (drinkerCalculating.ammout_drinked * this.beer_unit_value) * (this.includeTip ? 1.1 : 1);
    }
  }

  fim(d1: Drinker, beerAmmount: number) {
    return d1.end_in ? d1.end_in : beerAmmount;
  }

}
