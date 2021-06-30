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

			<div class="divisor"></div>

			<!-- Old password -->
			<div class="form-group">
				<label for="pass">Old password</label>
				<div class="input-box">
					<div></div>
					<input class="input" [type]="visibleOldPass ? 'text' : 'password'" name="old-pass" id="old-pass" formControlName="oldPass" required>
					<button type="button" (click)="changeVisibleOldPass()">
						<i
							class="bi"
							[class.bi-eye-fill]="!visibleOldPass"
							[class.bi-eye-slash-fill]="visibleOldPass"
						></i>
					</button>
				</div>
			</div>

			<!-- New password -->
			<div class="form-group">
				<label for="pass">New password</label>
				<div class="input-box">
					<div></div>
					<input class="input" [type]="visibleNewPass ? 'text' : 'password'" name="new-pass" id="new-pass" formControlName="newPass" required>
					<button type="button" (click)="changeVisibleNewPass()">
						<i
							class="bi"
							[class.bi-eye-fill]="!visibleNewPass"
							[class.bi-eye-slash-fill]="visibleNewPass"
						></i>
					</button>
				</div>
			</div>

			<!-- Confirm new password -->
			<div class="form-group">
				<label for="conf-pass">Confirm new password</label>
				<div class="input-box">
					<div></div>
					<input class="input" type="password" name="conf-new-pass" id="conf-new-pass" formControlName="confNewPass" required>
				</div>
			</div>
			
			<!-- Submit -->
			<div class="form-group submit-container">
				<input class="submit" type="submit" value="Salvar">
				<button type="button" (click)="close()">Cancelar</button>
			</div>
		</form>
	`,
	styles: [`
		form {
			min-width: 22rem;
			width: 100%;
		}
	`]
})
export class EditModal
{
	form: FormGroup;
	visibleOldPass = false;
	visibleNewPass = false;

	constructor(
		private dialogRef: MatDialogRef<EditModal>,
		@Inject(MAT_DIALOG_DATA) public user: User,
		private formBuilder: FormBuilder
	) {
		this.form = this.formBuilder.group({
			name: user.name,
			email: user.email,
			oldPass: '',
			newPass: '',
			confNewPass: ''
		});
	}

	close()
	{
		this.dialogRef.close();
	}

	changeVisibleOldPass()
	{
		this.visibleOldPass = !this.visibleOldPass;
	}

	changeVisibleNewPass()
	{
		this.visibleNewPass = !this.visibleNewPass;
	}

	onSubmit()
	{
		const data = {
			name: this.form.value.name,
			email: this.form.value.email,
			oldPass: this.form.value.oldPass,
			newPass: this.form.value.newPass,
			confNewPass: this.form.value.confNewPass
		};

		api.put(`user/${this.user.id}`, data).then(res =>
		{
			this.form.reset();
			this.close();

			alert('Usuário atualizado com sucesso!');
		})
		.catch(err =>
		{
			switch(err.response?.data.code)
			{
				case 'UNFILLED_FIELD':
					alert('Preencha todos os campos.');
					break;
				case 'INVALID_LENGTH':
					alert('Preencha os campos corretamente');
					break;
				case 'DIFFERENT_PASSWORDS':
					alert('Senhas diferentes.');
					break;
				case 'INVALID_PASSWORD':
					alert('Senha antiga inválida.');
					break;
				default:
					console.error(err);
					alert('Erro ao cadastrar usuário.');
			}
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
