import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-form',
	template: `
    	<h2>Form</h2>

		<form [formGroup]="form" (ngSubmit)="onSubmit()">
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" name="email" id="email" formControlName="email">
			</div>

			<div class="form-group">
				<label for="pass">Password</label>
				<input type="password" name="pass" id="pass" formControlName="pass">
			</div>
			
			<input type="submit" value="Salvar">
		</form>
	`,
	styles: []
})
export class FormComponent implements OnInit
{
	form: FormGroup = this.formBuilder.group({
		email: [''],
		pass: ['']
	});

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {}

  	onSubmit()
	{
		// aqui você pode implementar a logica para fazer seu formulário salvar
		console.log(this.form.value);

		// Usar o método reset para limpar os controles na tela
		this.form.reset();
	}
}
