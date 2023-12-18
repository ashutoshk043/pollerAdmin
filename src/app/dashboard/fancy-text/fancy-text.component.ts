import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
@Component({
  selector: 'app-fancy-text',
  templateUrl: './fancy-text.component.html',
  styleUrls: ['./fancy-text.component.css']
})
export class FancyTextComponent {
  title:string="Fancy Text"
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
