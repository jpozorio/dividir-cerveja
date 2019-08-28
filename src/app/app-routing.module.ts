import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{path: '', redirectTo: 'config', pathMatch: 'full'},
	{path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigPageModule)},
	{path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
