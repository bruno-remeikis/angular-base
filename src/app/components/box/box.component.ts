import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  template: `
		<h3>{{ title }}</h3>
		<ng-content></ng-content>
  `,
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {
	@Input() title: string = '';
}
