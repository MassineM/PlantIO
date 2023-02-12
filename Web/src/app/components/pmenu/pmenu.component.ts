import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pmenu',
  templateUrl: './pmenu.component.html',
  styleUrls: ['./pmenu.component.css'],
})
export class PmenuComponent {
  @Input() label1 = '';
  @Input() label2 = '';
  @Input() label3 = '';
  @Output() selectedMode = new EventEmitter<number>();
  selectMode = 0;
  ngOnInit(): void {
    this.setMode(0);
  }
  setMode(mode: number) {
    this.selectMode = mode;
    this.selectedMode.emit(this.selectMode);
  }
}
