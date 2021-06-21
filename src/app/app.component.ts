import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<header>
			<div class="title">
				<img src="assets/angular-js.svg" alt="Angular">
				<h1>Angular base</h1>
			</div>
			<nav class="main-menu">
				<ul>
					<li><a routerLink="/">Home</a></li>
					<li><a routerLink="/form">Form</a></li>
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
