import {Component} from '@angular/core';
import {Drinker, TableService} from "./table.service";

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(
			private _tableService: TableService,
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
		}
	}

	getTotalAmmount(): number {
		let totalAmmount = 0;
		let qtd = this._tableService.drinkers.length;
		let last: Drinker;
		for (let d of this._tableService.drinkers) {
			let number = qtd--;
			if (!last || last.start_in != d.start_in) {
				totalAmmount += (this._tableService.beer_ammount - totalAmmount - d.start_in) / number;
			}
			last = d;
		}
		return totalAmmount;
	}

	startInChanged() {
		const total = this.getTotalAmmount();
		const beerAmmount = this._tableService.beer_ammount;
		if (total > beerAmmount || beerAmmount == 0 || total < 0) {
			return;
		}
		let qtdeToSplit = [];
		let drinkers = this._tableService.drinkers.filter(d => d.name != '');
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
			drinkerCalculating.should_pay = (drinkerCalculating.ammout_drinked * this._tableService.beer_unit_value) * (this._tableService.includeTip ? 1.1 : 1);
		}
	}

	fim(d1: Drinker, beerAmmount: number) {
		return d1.end_in ? d1.end_in : beerAmmount;
	}

	deleteDrinker(idx: number) {
		this._tableService.drinkers.splice(idx, 1);
		if (this._tableService.drinkers.length > 0) {
			this.startInChanged();
		}
	}

	partialPayed(drinker: Drinker) {
		drinker.end_in = this._tableService.beer_ammount;
		this.startInChanged();
	}
}
