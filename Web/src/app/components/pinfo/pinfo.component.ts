import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pinfo',
  templateUrl: './pinfo.component.html',
  styleUrls: ['./pinfo.component.css'],
})
export class PinfoComponent {
  @Input() label: string = '';
  @Input() data: any;
}
