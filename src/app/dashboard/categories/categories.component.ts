import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TitleService } from 'src/app/services/title.service';
import { BlogService } from 'src/app/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  title:string="Categories"
  actionType:string="Add new category."
  modelTitle:string=''
  clickAction:string="Add"
  categoryForms:any = FormBuilder
  blogCategories:any
  wishingScriptCategories:any
  webStroryCategories:any
  catId:any=undefined

  constructor(private toaster:ToastrService, private titleService: TitleService, private fb: FormBuilder, private blogService:BlogService) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.categoryForm()
    this.getAllCategories()
  }

  setValueToModel(title:any){
    this.categoryForms.reset()
    this.modelTitle = ''
    this.modelTitle = title
    this.clickAction = "Add"
  }

  categoryForm(){
    this.categoryForms = this.fb.group({
      newCategory:['', Validators.required]
    })
  }

  submitCategory(){
    const data = {
      'parentCatergory':this.modelTitle,
      'childCategory':this.categoryForms.value.newCategory
    }
    this.blogService.addCategory(data).subscribe({
      next:(res:any)=>{
        if(res.status){
          this.toaster.success(res.msg)
          this.getAllCategories()
        }else{
          this.toaster.error(res.msg)
        }
      },
      error: (error:any)=>{
        this.toaster.error(error.message)
      }
    })
  }

  getAllCategories(){
    this.blogService.getAllCategories().subscribe({
      next:(res:any)=>{
        this.blogCategories = res.blogCategories
        this.wishingScriptCategories = res.wishingScriptCategories
        this.webStroryCategories = res.webStoryCategories
      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

  oldChildCategory:string=''
  editCat(catObject:any){
    this.catId = catObject._id
    this.oldChildCategory = catObject.childCategory
    this.categoryForms.reset()
    this.modelTitle = ''
    this.modelTitle = catObject.parentCategory
    this.clickAction = "Update"
    this.categoryForms.patchValue({
      newCategory:catObject.childCategory
    })
  }

  updateCategory(){
    const data ={
      id:this.catId,
      parentCategory:this.modelTitle,
      childCategory:this.categoryForms.value.newCategory,
      oldChildCategory:this.oldChildCategory
    }


    Swal.fire({
      title: 'Are you sure want to update this category ?',
      text: "All categories associated with this blog will be updated.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update All!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.updateCategories(data).subscribe({
          next:(res:any)=>{
            if(res.status){
              this.toaster.success(res.msg)
              this.getAllCategories()
            }else{
              this.toaster.error(res.msg)
            }
          },
          error:(error:any)=>{
            this.toaster.error(error)
          }
        })
      }
    })
  }

  deleteCat(catObject:any){
    let data={
      catId: catObject._id,
      oldChildCategory:catObject.childCategory
    }
    
    Swal.fire({
      title: 'Are you sure want to delete this category ?',
      text: "All blogs associated with this category will be deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes , Delete All!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteCategory(data).subscribe({
          next:(res:any)=>{
            if(res.status){
              this.toaster.success(res.msg)
              this.getAllCategories()
            }else{
              this.toaster.error(res.msg)
            }
          },
          error:(error:any)=>{
            this.toaster.error(error)
          }
        })
      }
    })
  }

}
