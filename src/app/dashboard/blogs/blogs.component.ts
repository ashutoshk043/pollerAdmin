import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { BlogService } from 'src/app/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  title:string="Blogs"
  receivedData:any
  baseUrl = environment.baseUrl
  bucketBaseUrl = environment.blogImageBucket
  authorId:any
  
  constructor(
    private titleService: TitleService,
    private blogService:BlogService,
    private toastr : ToastrService,
    private cookieService:CookieService,
    private loader:NgxSpinnerService,
    private router:Router,
    
    ) {}

  ngOnInit() {
    
    this.titleService.setTitle(this.title);
    this.getAllBlogs()
    this.getUserDetails()
    
  }

  getAllBlogs(){
    this.loader.show()
    this.blogService.getAllBlogs().subscribe({
      next:(res:any)=>{
        console.log(res)
        if(res.status){
          this.receivedData = res.message
        }
        this.loader.hide()
      },
      error: (error:any)=>{
        console.log(error)
        this.loader.hide()
      }
    })
  }

  getUserDetails(){
    this.loader.show()
    const token = this.cookieService.get('auth')
    const decoded: any = jwt_decode(token)
    this.authorId = decoded.data._id
    this.loader.hide()
  }

  changeStatus(_id:string, status:string){
    this.loader.show()
    let SendStatus = ''
    if(status=='draft'){
      SendStatus = 'published'
    }else if(status=='published'){
      SendStatus = 'draft'
    }
    let data = {_id:_id, status:SendStatus, authorId:this.authorId}

    this.blogService.changeStatus(data).subscribe({
      next: (res:any)=>{
        this.toastr.success("Status Updated Successfully")
        this.getAllBlogs()
      }
    })
    this.loader.hide()
  }

  navigateToAddEditBlogs(): void {
    this.router.navigate(['/home/add-edit-blogs']);
  }
  

  deleteblog(_id: string): void {
    // this.loader.show();
    const data = { _id: _id, authorId: this.authorId };
    Swal.fire({
      title: 'Are you sure you want to delete this blog?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlogById(data).subscribe({
          next: (res: any) => {
            if (res.status) {
              Swal.fire(
                'Deleted!',
                'Blog has been deleted.',
                'success'
              );
              // Call getAllBlogs() only after successful deletion
              this.getAllBlogs();
            } else {
              Swal.fire(
                'Something Error!',
                'Please Refresh this page and try again.',
                'error'
              );
            }
            // Hide loader after response is received
            this.loader.hide();
          },
          error: (error: any) => {
            this.toastr.error(error.message);
            // Hide loader in case of error
            this.loader.hide();
          }
        });
      } else {
        // Hide loader if user cancels deletion
        this.loader.hide();
      }
    });
  }
  

  editblog(row:any){
    this.loader.show()
    this.blogService.setEditBlogId(row)
  }

}
