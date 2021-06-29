import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';

import api from 'src/app/services/api';
import { User } from 'src/app/models/user';

@Component({
	selector: 'edit-modal',
	template: `
		<h2>Edit user</h2>

		<form [formGroup]="form" (ngSubmit)="onSubmit()">
			<!-- Name -->
			<div class="form-group">
				<label for="name">Name</label>
				<div class="input-box">
					<div></div>
					<input class="input" type="text" name="name" id="name" formControlName="name" required>
				</div>
			</div>

			<!-- Email -->
			<div class="form-group">
				<label for="email">Email</label>
				<div class="input-box">
					<div></div>
					<input class="input" type="email" name="email" id="email" formControlName="email" required>
				</div>
			</div>
			
			<!-- Submit -->
			<div class="form-group submit-container">
				<input type="submit" value="Salvar">
			</div>
		</form>
	`,
	styles: [`
		form {
			min-width: 20rem;
			width: 100%;
		}
	`]
})
export class EditModal
{
	form: FormGroup;

	constructor(
		private dialogRef: MatDialogRef</*MyDialogComponent*/ EditModal>,
		@Inject(MAT_DIALOG_DATA) public user: User,
		private formBuilder: FormBuilder
	) {
		this.form = this.formBuilder.group({
			name: user.name,
			email: user.email
		})
	}

	onSubmit()
	{
		const data = {
			name: this.form.value.name,
			email: this.form.value.email
		};

		api.put(`user/${this.user.id}`, data).then(res =>
		{
			this.form.reset();
			this.dialogRef.close();

			alert('Usuário cadastrado com sucesso!');
		})
		.catch(err =>
		{
			console.error(err);
		});
	}
}

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
						<button type="button" (click)="openEditDialog(user)">
							<i class="bi bi-pencil"></i>
						</button>

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

	constructor(public dialog: MatDialog) {}

	ngOnInit(): void
	{
		//this.select();

		// Também é executado no primeiro carregamento página
		this.dialog.afterAllClosed.subscribe(() => this.select());
	}

	select()
	{
		api.get('user').then(res =>
		{
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

	openEditDialog(user: User)
	{
		this.dialog.open(
			EditModal,
			{
				panelClass: 'edit-modal',
				data: user
			}
		);
	}
}
