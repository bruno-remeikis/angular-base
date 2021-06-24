import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: { title: 'Home' }
	},
	{
		path: 'form',
		component: FormComponent,
		data: { title: 'Form' }
	},
	{
		path: 'list',
		component: ListComponent,
		data: { title: 'List' }
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
