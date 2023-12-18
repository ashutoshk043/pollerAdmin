import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-festive',
  templateUrl: './festive.component.html',
  styleUrls: ['./festive.component.css']
})
export class FestiveComponent {
  title:string="Festive"
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
