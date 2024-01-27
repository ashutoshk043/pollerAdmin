import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms'  
import { WebstoryService } from 'src/app/services/webstory.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-edit-stories',
  templateUrl: './add-edit-stories.component.html',
  styleUrls: ['./add-edit-stories.component.css']
})
export class AddEditStoriesComponent {

  webStoryForm!:FormGroup
  imageBuffer:any
  formData = new FormData()

  

  constructor(private fb:FormBuilder, private webstory:WebstoryService, private toster:ToastrService) {  
     
  }  

  ngOnInit(){
    this.createWebStoryform()
  }

  createWebStoryform(){
    this.webStoryForm = this.fb.group({  
      story_heading: ['', Validators.required],  
      meta_keywords:['', Validators.required],
      category:['', Validators.required],
      meta_description:['',Validators.required],
      story_details: this.fb.array([
        {  
          story_text: ['', Validators.required],  
          story_image: ['', Validators.required]  
        }
      ]) ,  
    });  
  }


  story_details():FormArray{
      return this.webStoryForm.get('story_details') as FormArray
  }

  new_story_details(): FormGroup {  
    return this.fb.group({  
      story_text: ['', Validators.required],  
      story_image: ['', Validators.required]  
    })  
  }  


  addMore(){
   this.story_details().push(this.new_story_details())
  }

  deleteOne(index:number){
    this.story_details().removeAt(index);  
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
    
    this.webstory.createstories(this.formData).subscribe({
      next: (res: any) => {
        console.log('Success:', res);
        this.toster.success("Story Created Successfully..")
        this.resetFormData()
      },
      error: (error: any) => {
        this.toster.error("Error While Creating Story..")
        console.error('Error:', error);
        this.resetFormData()
      }
    })
  }
}
