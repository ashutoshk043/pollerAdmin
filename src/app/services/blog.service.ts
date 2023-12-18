import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  clickedRow:any

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createBlog(data: any) {
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/createBlog`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  getAllBlogs(){
    return this.http.get(`${environment.baseUrl}/getAllBlogsForDashboard`)  
  }

  changeStatus(data:any){
   
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/updateBlog/${data._id}`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
    
  }

  deleteBlogById(data:any){
    const token = this.cookieService.get('auth')
    return this.http.delete(`${environment.baseUrl}/deleteBlog/${data._id}`,
     {
      headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
    })
  }

  setEditBlogId(row:any){
    this.clickedRow = row
  }

  updateBlogs(data:any, id:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/updateBlog/${id}`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  addCategory(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/addCategory`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  updateCategories(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/updateCategory`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  getAllCategories(){
    return this.http.get(`${environment.baseUrl}/getAllCategories`)
  }

  deleteCategory(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/deleteCategory`, data, {
      headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
    })
  }
}
