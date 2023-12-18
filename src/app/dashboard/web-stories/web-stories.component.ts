import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-web-stories',
  templateUrl: './web-stories.component.html',
  styleUrls: ['./web-stories.component.css']
})
export class WebStoriesComponent {
  title:string="Web Stories"
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
