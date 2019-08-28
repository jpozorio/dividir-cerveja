import {Component} from '@angular/core';
import {TableService} from "../table.service";
import {NavController} from "@ionic/angular";

@Component({
	selector: 'app-config',
	templateUrl: 'config.page.html',
	styleUrls: ['config.page.scss'],
})
export class ConfigPage {

	error = false;

	constructor(
			private _tableService: TableService,
			public _navigador: NavController
	) {

	}

	setStartInForEachDrinker() {
		if (!this._tableService.validConfigs()) {
			this.error = true;
			return;
		}
		this._navigador.navigateForward(['home']);
	}
}
