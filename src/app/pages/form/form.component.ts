import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import api from '../../services/api';

@Component({
	selector: 'app-form',
	template: `
    	<h2 class="page-title">Form</h2>

		<app-box class="box-insert" title='Insert'>
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

				<!-- Password -->
				<div class="form-group">
					<label for="pass">Password</label>
					<div class="input-box">
						<div></div>
						<input class="input" [type]="visiblePass ? 'text' : 'password'" name="pass" id="pass" formControlName="pass" required>
						<button (click)="changeVisiblePass()">
							<i
								class="bi"
								[class.bi-eye-fill]="!visiblePass"
								[class.bi-eye-slash-fill]="visiblePass"
							></i>
						</button>
					</div>
				</div>

				<!-- Confirm password -->
				<div class="form-group">
					<label for="conf-pass">Confirm password</label>
					<div class="input-box">
						<div></div>
						<input class="input" type="password" name="conf-pass" id="conf-pass" formControlName="confPass" required>
					</div>
				</div>
				
				<!-- Submit -->
				<div class="form-group submit-container">
					<input type="submit" value="Salvar">
				</div>
			</form>
		</app-box>
	`,
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit
{
	form: FormGroup = this.formBuilder.group({
		name: '',
		email: '',
		pass: '',
		confPass: ''
	});

	visiblePass = false;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {}

	changeVisiblePass()
	{
		this.visiblePass = !this.visiblePass;
	}

  	onSubmit()
	{
		const data = {
			name: this.form.value.name,
			email: this.form.value.email,
			pass: this.form.value.pass,
			confPass: this.form.value.confPass
		};

		api.put('user', data).then(res =>
		{
			console.log('RESULTADO:');
			console.log(res);
		})
		.catch(err =>
		{
			console.error('Error');
		});
	}
}
