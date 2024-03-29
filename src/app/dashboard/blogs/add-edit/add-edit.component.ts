import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { BlogService } from 'src/app/services/blog.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  title:string="Add or Edit"
  blogForm:any = FormBuilder
  htmlContent = ''
  url = ""
  CurrAction= "Add"
  btnAction="Publish" 
  loggedUser:any
  authorId:any
  categories:any = []
  pubishStatus:any = ["draft", "published"]
  formData = new FormData();

  
  constructor(private loader:NgxSpinnerService ,private blogservice:BlogService ,private titleService: TitleService, private formbuilder:FormBuilder, private cookieservice:CookieService, private toster:ToastrService, private router:Router) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.createBlogForm()
    this.getUserDetails()
    this.editFormData()
    this.getAllCategories()
  }

  getUserDetails(){
    const token = this.cookieservice.get('auth')
    const decoded: any = jwt_decode(token)
    this.loggedUser = decoded.data.name
    this.authorId = decoded.data._id
  }

  selectThumbnail(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.formData.delete('thumbnail');
      const file = event.target.files[0];
      this.formData.append('thumbnail', file);
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target && event.target.result) {
            this.url = event.target.result as string;
          }
        };
  
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
  
        reader.readAsDataURL(file);
      }
    }
  }
  

  createBlogForm(){
    this.blogForm = this.formbuilder.group({
        title: ['', [Validators.required, Validators.maxLength(200)]],
        htmlContent: ['', Validators.required],
        category:['', Validators.required],
        status:['', Validators.required],
        thumbnail:['', Validators.required],
        keywords:['', Validators.required],
        metaDescription:['', [Validators.required, Validators.maxLength(300)]],
    })
  }

  editFormData(){
    const editRow = this.blogservice.clickedRow
    if(editRow != undefined){
      this.CurrAction = "Update"
      this.btnAction="Update"
      this.blogForm.patchValue({
        title: editRow.heading,
        htmlContent:editRow.description,
        category:editRow.category,
        status:editRow.status,
        thumbnail:editRow.thumbnail,
        keywords:editRow.keywords,
        metaDescription:editRow.keywords_description,
      })
      this.url = environment.blogImageBucket+'/'+ editRow.thumbnail
    }
  }


  submitFormData(){
  
    this.formData.append("heading",this.blogForm.value.title),
    this.formData.append('description',this.blogForm.value.htmlContent),
    this.formData.append('keywords', this.blogForm.value.keywords)
    this.formData.append('keywords_description',this.blogForm.value.metaDescription),
    this.formData.append('category',this.blogForm.value.category),
    this.formData.append('status',this.blogForm.value.status),
    this.formData.append('user',this.loggedUser),
    this.formData.append('authorId',this.authorId)

    const editRow = this.blogservice.clickedRow

    if(editRow == undefined){
      this.blogservice.createBlog(this.formData).subscribe({
        next: (res:any)=>{
          if(res.status){
            this.toster.success("Blog Added Successfully..")
            this.deleteSubmittedFormData()
          }else{
            this.toster.error(res.messsge)
            this.deleteSubmittedFormData()
          }
        },
        error: (error)=>{
          this.deleteSubmittedFormData()
          this.toster.error(error.message)
        }
       })
    }else{
      this.blogservice.updateBlogs(this.formData, editRow._id).subscribe({
        next: (res:any)=>{
          if(res.status){
            this.toster.success("Blog Updated Successfully..")
            this.deleteSubmittedFormData()
            this.router.navigate(['blogs'])
          }else{
            this.toster.error(res.messsge)
            this.deleteSubmittedFormData()
          }
        },
        error: (error)=>{
          this.deleteSubmittedFormData()
          this.toster.error(error.message)
        }
      })
    }


    
    // console.log(this.formData)
  }

  deleteSubmittedFormData(){
    this.formData.delete("heading"),
    this.formData.delete('description'),
    this.formData.delete('keywords')
    this.formData.delete('keywords_description'),
    this.formData.delete('category'),
    this.formData.delete('status'),
    this.formData.delete('user'),
    this.formData.delete('authorId')
  }


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '400px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Start writing here....',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: environment.baseUrl + '/uploadTextEditorImages',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: []
};

getAllCategories(){
  this.blogservice.getAllCategories().subscribe({
    next:(res:any)=>{
      res.blogCategories.forEach((element:any) => {
              this.categories.push(element.childCategory)
      });
    },
    error:(error:any)=>{
      this.toster.error("Error while fetching Blogs categories..")
    }
  })
}

}
