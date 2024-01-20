import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebstoryService {

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
    return this.http.get(`${environment.baseUrl}/getAllStoriesForDashboard`)
  }
}
