import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<header>
			<a class="title" routerLink="/">
				<img src="assets/angular.svg" alt="Angular">
				<h1>Angular base</h1>
			</a>
			<nav class="main-menu">
				<ul>
					<li><a routerLink="/">Home</a></li>
					<li><a routerLink="/form">Form</a></li>
					<li><a routerLink="/list">List</a></li>
				</ul>
			</nav>
		</header>

		<div class="content">
			<router-outlet></router-outlet>
		</div>
	`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent {}
