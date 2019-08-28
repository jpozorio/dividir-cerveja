import {Component, OnInit} from '@angular/core';
import {Drinker, TableService} from "../table.service";
import {NgTools_InternalApi_NG2_ExtractI18n_Options} from "@angular/compiler-cli/src/ngtools_api";
import {NavController} from "@ionic/angular";

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	constructor(
			private _tableService: TableService,
			private _navigator: NavController
	) {
		_tableService.inicializeTable();
		_tableService.addBlankDrinker();
		_tableService.addBlankDrinker();
	}

	ngOnInit(): void {
		if (!this._tableService.validConfigs()) {
			this._navigator.navigateRoot(['config']);
		}
	}

	addNewDrinker() {
		this._tableService.addBlankDrinker();
	}

	addNewDrinkerIfNecessary() {
		let qtd = this._tableService.drinkers.length;
		var last: Drinker = this._tableService.drinkers[qtd - 1];
		if (last.name) {
			this.addNewDrinker();
		}
	}

	getTotalAmmount(): number {
		let totalAmmount = 0;
		let qtd = this._tableService.drinkers.length;
		var last: Drinker;
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
		let total = this.getTotalAmmount();
		if (total > this._tableService.beer_ammount || this._tableService.beer_ammount == 0 || total < 0) {
			return;
		}
		let assign: Drinker[] = Object.assign([], this._tableService.drinkers);
		let drinkers: Drinker[] = assign.sort((da, db) =>
				db.start_in - da.start_in
		);
		let qtd = drinkers.length - 1;
		var last: Drinker;
		let totalAmmount = 0;
		for (let d of drinkers) {
			if (d.name) {
				let number = qtd--;
				var currentStartIn = d.start_in;
				currentStartIn = !currentStartIn ? 1 : currentStartIn;
				if (last && last.start_in == currentStartIn) {
					d.ammout_drinked = last.ammout_drinked;
					d.should_pay = last.should_pay;
				} else {
					d.ammout_drinked = (this._tableService.beer_ammount - totalAmmount - currentStartIn + 1) / number;
					d.should_pay = d.ammout_drinked * this._tableService.beer_unit_value;
				}
				totalAmmount += d.ammout_drinked;
				last = d;
			}
		}
	}

	deleteDrinker(idx: number) {
		this._tableService.drinkers.splice(idx, 1);
		if (this._tableService.drinkers.length > 0) {
			this.startInChanged();
		}
	}
}
