import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebstoryService {

  clickedRow:any

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createstories(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/createstories`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  getstory(){
    return this.http.get(`${environment.baseUrl}/getAllStoriesForDashboard`);
  }

  deleteStory(id:any){

    return this.http.delete(`${environment.baseUrl}/deleteSingleStory/${id}`);
  }

  changeStatus(data:any){
    return this.http.post(`${environment.baseUrl}/chnagestorystatus`,data)
  }

  setEditStoryId(row:any){
    this.clickedRow = row
  }

  updateStory(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/updateStories`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }
}
