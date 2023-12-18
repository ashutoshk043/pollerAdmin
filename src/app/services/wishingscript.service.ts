import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class WishingscriptService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createWishingScript(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/createPollScript`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  getAllPoliticalScript(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/getAllPoliticalScript`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  updateStatus(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/changeStatus`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }
  // updatepoliticalScript

  updateNormalStatus(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/changeNormalStatus`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  updatepoliticalScript(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/updatepoliticalScript`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  createNornalWishingScript(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/createNormalScript`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

    getAllnormalScript(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/getAllScripts`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }

  updatenormalScript(data:any){
    const token = this.cookieService.get('auth')
    return this.http.post(`${environment.baseUrl}/updateScript`,
      data,
      {
        headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
      })
  }
}
