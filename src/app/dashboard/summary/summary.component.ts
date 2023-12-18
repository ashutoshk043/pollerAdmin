import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {

  title:string="Summary"
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }



}
