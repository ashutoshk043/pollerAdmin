import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { WebstoryService } from 'src/app/services/webstory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-web-stories',
  templateUrl: './web-stories.component.html',
  styleUrls: ['./web-stories.component.css']
})
export class WebStoriesComponent {
  title:string="Web Stories"
  allStories:any
  bucketBaseUrl= environment.bucketBaseUrl
  constructor(private titleService: TitleService, private webstory:WebstoryService) {

  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.getAllStoriesForDashboard()
  }

  getAllStoriesForDashboard(){
    this.webstory.getstory().subscribe({
      next:((res:any)=>{
        this.allStories = res?.data
      }),
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

}
