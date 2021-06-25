import { Component, OnInit } from '@angular/core';

import api from 'src/app/services/api';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-list',
	template: `
		<h2 class="page-title">List</h2>

		<app-box>
			<ul class="users" *ngFor="let user of users">
				<li>
					<div></div>
					<span class="id">{{user.id}}</span>
					<span class="email">{{user.email}}</span>
				</li>
			</ul>
		</app-box>
	`,
	styleUrls: ['list.components.scss']
})
export class ListComponent implements OnInit
{
	users: User[] = [];

	constructor() {}

	ngOnInit(): void
	{
		api.get('user').then(res =>
		{
			console.log('RESULTADO:');
			console.log(res);
			this.users = res.data;
		})
		.catch(err =>
		{
			console.error('Error');
		});
	}
}
