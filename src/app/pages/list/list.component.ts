import { Component, OnInit } from '@angular/core';

import api from 'src/app/services/api';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-list',
	template: `
		<p>
			list works!
		</p>
	`,
	styles: []
})
export class ListComponent implements OnInit
{
	constructor() {}

	ngOnInit(): void {}

	list()
	{
		api.get('user').then(res =>
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
