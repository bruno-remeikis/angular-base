import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import api from '../../services/api';

@Component({
	selector: 'app-form',
	template: `
    	<h2>Form</h2>

		<form [formGroup]="form" (ngSubmit)="onSubmit()">
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" name="email" id="email" formControlName="email" required>
			</div>

			<div class="form-group">
				<label for="pass">Password</label>
				<input type="password" name="pass" id="pass" formControlName="pass" required>
			</div>

			<div class="form-group">
				<label for="conf-pass">Confirm password</label>
				<input type="password" name="conf-pass" id="conf-pass" formControlName="confPass" required>
			</div>
			
			<input type="submit" value="Salvar">
		</form>
	`,
	styles: []
})
export class FormComponent implements OnInit
{
	form: FormGroup = this.formBuilder.group({
		email: '',
		pass: '',
		confPass: ''
	});

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {}

  	onSubmit()
	{
		const data = {
			email: this.form.value.email,
			pass: this.form.value.pass,
			confPass: this.form.value.pass
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
