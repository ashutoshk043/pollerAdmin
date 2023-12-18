import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-group-joiner',
  templateUrl: './group-joiner.component.html',
  styleUrls: ['./group-joiner.component.css']
})
export class GroupJoinerComponent {
  title:string="Group Joiner"
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
