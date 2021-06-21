import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	template: `
		<h2>Home</h2>
		
		<output>{{num}}</output>
		<button (click)="minus()">-</button>
		<button (click)="plus()">+</button>
	`,
	styles: []
})
export class HomeComponent implements OnInit
{
	num: number = 0;

	constructor() {}

	ngOnInit(): void {}

	plus()
	{
		this.num++;
	}

	minus()
	{
		this.num--;
	}
}
