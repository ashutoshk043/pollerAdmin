import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms'  
import { WebstoryService } from 'src/app/services/webstory.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-add-edit-stories',
  templateUrl: './add-edit-stories.component.html',
  styleUrls: ['./add-edit-stories.component.css']
})
export class AddEditStoriesComponent {

  webStoryForm!:FormGroup
  imageBuffer:any
  formData = new FormData()
  allStories:any
  categories:any
  

  constructor(private blogservice:BlogService, private fb:FormBuilder, private webstory:WebstoryService, private toster:ToastrService, private loader: NgxSpinnerService) {  
     
  }  

  ngOnInit(){
    this.createWebStoryform()
    this.editFormData()
    this.getAllStories()
    this.getAllCategories()
  }

  createWebStoryform() {
    this.webStoryForm = this.fb.group({
        story_heading: ['', Validators.required],
        meta_keywords: ['', Validators.required],
        category: ['', Validators.required],
        meta_description: ['', Validators.required],
        story_details: this.fb.array([
            this.createStoryGroup() // Initial story group
        ]),
    });
}


  story_details():FormArray{
      return this.webStoryForm.get('story_details') as FormArray
  }

  createStoryGroup() {
    return this.fb.group({
        story_text: ['', Validators.required],
        story_image: ['', Validators.required]
    });
}  


addMore() {
  const storyDetailsArray = this.webStoryForm.get('story_details') as FormArray;
  storyDetailsArray.push(this.createStoryGroup());
}

deleteOne(index: number) {
  const storyDetailsArray = this.webStoryForm.get('story_details') as FormArray;
  storyDetailsArray.removeAt(index);
}


  handleFileInput(event: any, index: number): void {
    const file = event.target.files[0];
    this.formData.append(`story_image${index}`, file);
  }

  resetFormData(){
    this.formData = new FormData()
  }
  
  
  


  onSubmit(){
    let imageData: any = []
    
    this.formData.append('story_heading', this.webStoryForm.get('story_heading')?.value);
    this.formData.append('meta_keywords', this.webStoryForm.get('meta_keywords')?.value);
    this.formData.append('category', this.webStoryForm.get('category')?.value);
    this.formData.append('meta_description',this.webStoryForm.get('meta_description')?.value);

    (this.webStoryForm.get('story_details') as FormArray).controls.forEach((storyDetailGroup: any, index: number) => {
      this.formData.append(`story_text${index}`, storyDetailGroup.get('story_text')?.value);
    });
    
    if(this.webstory.clickedRow == undefined){
      this.webstory.createstories(this.formData).subscribe({
        next: (res: any) => {
          console.log('Success:', res);
          this.toster.success("Story Created Successfully..")
          this.resetFormData()
          this.getAllStories()
        },
        error: (error: any) => {
          this.toster.error("Error While Creating Story..")
          console.error('Error:', error);
          this.resetFormData()
        }
      })
    }else{
      const editRow = this.webstory.clickedRow
      this.formData.append('_id', editRow._id)
      this.webstory.updateStory(this.formData).subscribe({
        next: (res: any) => {
          console.log('Success:', res);
          this.toster.success("Story Updated Successfully..")
          this.resetFormData()
          this.getAllStories()
        },
        error: (error: any) => {
          this.toster.error("Error While Updating Story..")
          console.error('Error:', error);
          this.resetFormData()
          this.loader.hide()
        }
      })
    }
    
  }

  editFormData(){
    const editRow = this.webstory.clickedRow
    if(editRow != undefined){
      this.webStoryForm.patchValue({
        story_heading: editRow.story_heading,
        meta_description:editRow.meta_description,
        category:editRow.category,
        meta_keywords:editRow.meta_keywords,
        story_details:editRow.storiesData,
      })
    }
  }


  getAllStories(){
    this.webstory.getstory().subscribe({
     next:(res:any)=>{
      this.allStories = res.data
     },
     error:(error:any)=>{
      console.log(error, "error issss")
     }
    })
  }


  getAllCategories(){
    this.blogservice.getAllCategories().subscribe({
      next:(res:any)=>{
        this.categories = res?.webStoryCategories
      },
      error:(error:any)=>{
        console.log(error.message)
      }
    })
  }


}
