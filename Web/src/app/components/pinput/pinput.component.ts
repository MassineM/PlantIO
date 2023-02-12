import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pinput',
  templateUrl: './pinput.component.html',
  styleUrls: ['./pinput.component.css'],
})
export class PinputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  pInput: HTMLInputElement = document.getElementById(
    this.label
  ) as HTMLInputElement;
  changed = false;

  ngOnInit() {}
  ngDoCheck() {
    this.pInput = document.getElementById(this.label) as HTMLInputElement;
  }
  setActiveLabel() {
    this.changed = true;
  }
  checkActiveLabel() {
    if (this.pInput?.value == undefined || this.pInput?.value == '') {
      this.changed = false;
    } else {
      this.changed = true;
    }
  }
}
