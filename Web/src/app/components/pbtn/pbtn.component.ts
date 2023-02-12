import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pbtn',
  templateUrl: './pbtn.component.html',
  styleUrls: ['./pbtn.component.css'],
})
export class PbtnComponent {
  @Input() label: string = '';
  @Input() type: string = '';
}
