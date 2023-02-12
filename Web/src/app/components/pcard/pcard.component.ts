import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-pcard',
  templateUrl: './pcard.component.html',
  styleUrls: ['./pcard.component.css'],
})
export class PcardComponent {
  @Input() pCardTemplate: TemplateRef<any> | null = null;
}
