import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TableService} from "./table.service";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		MatIconModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatInputModule,
		BrowserAnimationsModule
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers: [
		TableService,
	],
})
export class AppModule {
}
