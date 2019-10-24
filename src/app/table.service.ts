import {Injectable} from "@angular/core";

export class Drinker {
	name: string;
	start_in: number;
	ammout_drinked?: number;
	should_pay?: number;
}

@Injectable()
export class TableService {
	drinkers: Drinker[];
	beer_ammount: number = 1;
	beer_unit_value: number = 0;
	includeTip: boolean = false;

	addBlankDrinker() {
		this.drinkers.push(
				{
					name: '',
					start_in: 1,
				}
		)
	}

	inicializeTable() {
		this.drinkers = [];
	}

	validConfigs():boolean {
		return this.beer_ammount > 0 && this.beer_unit_value > 0
	}
}
