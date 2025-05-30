import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { WebstoryService } from 'src/app/services/webstory.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-stories',
  templateUrl: './web-stories.component.html',
  styleUrls: ['./web-stories.component.css']
})
export class WebStoriesComponent {
  title:string="Web Stories"
  allStories:any
  bucketBaseUrl= environment.pollerPublicStory
  constructor(private router:Router, private titleService: TitleService, private webstory:WebstoryService, private toster:ToastrService) {

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

  navigateToAddEditBlogs(): void {
    this.router.navigate(['/home/add-edit-webstories']);
  }

  editwebstory(row:any){
    this.webstory.setEditStoryId(row)
  }

  deletewebstory(id:any){
    this.webstory.deleteStory(id).subscribe({
      next:(res:any)=>{
        this.toster.success("Story Deleted Successfully ...")
        this.getAllStoriesForDashboard()
      },
      error:(error:any)=>{
        this.toster.error("Error While Deleting Story !!");
      }
    })
  }

  changeStatus(id:any, status:any){
    if(status==1){
      status = 0
    }else if(status==0){
      status = 1
    }
    let data = {
      id:id,
      status:status
    }
    this.webstory.changeStatus(data).subscribe({
      next:(res:any)=>{
        this.toster.success("Status Updated Successfully..")
        this.getAllStoriesForDashboard()
      },
      error:(error:any)=>{
        this.toster.error("Error While Updating Status !!")
      }
    })
  }

}
