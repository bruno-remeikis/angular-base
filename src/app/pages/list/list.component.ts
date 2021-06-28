import { Component, OnInit } from '@angular/core';

import api from 'src/app/services/api';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-list',
	template: `
		<h2 class="page-title">List</h2>

		<app-box title="Users">
			<span *ngIf="users.length === 0">
				Ainda não há usuários cadastrados
			</span>

			<ul class="users" *ngIf="users.length > 0">
				<li *ngFor="let user of users">
					<div class="border-left"></div>

					<span class="id">{{user.id}}</span>
					<div class="main-info">
						<span class="name">{{user.name}}</span>
						<span class="email">{{user.email}}</span>
					</div>

					<div class="buttons">
						<!--
						<button type="button">
							<i class="bi bi-pencil"></i>
						</button>
						-->
						
						<button type="button" (click)="delete(user.id!)">
							<i class="bi bi-trash"></i>
						</button>
					</div>
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
		this.select();
	}

	select()
	{
		api.get('user').then(res =>
		{
			console.log('RESULTADO:');
			console.log(res);
			this.users = res.data;
		})
		.catch(err =>
		{
			console.error(err);
		});
	}

	delete(id: number)
	{
		if(confirm(`Deseja mesmo deletar o usuário ${id}?`))
		{
			api.delete(`user/${id}`).then(() =>
			{
				this.select();
			})
			.catch(err =>
			{
				console.error(err);
			});
		}
	}
}
