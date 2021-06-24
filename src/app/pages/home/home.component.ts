import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	template: `
		<h2>Home</h2>
		
		<app-box class="box-increment" title='Increment'>
			<div class="output">
				<div></div>
				<output>{{num}}</output>
				<button (click)="reset()">
					<i class="bi bi-trash"></i>
				</button>
			</div>

			<div class="buttons">
				<button (click)="minus()">-</button>
				<button (click)="plus()">+</button>
			</div>
		</app-box>
	`,
	styleUrls: ['./home.container.scss']
})
export class HomeComponent implements OnInit
{
	num: number = 0;

	constructor() {}

	ngOnInit(): void {}

	plus () { this.num++;   }
	minus() { this.num--;   }
	reset() { this.num = 0; }
}
