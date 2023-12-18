import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  authorId:any
  userName:any

  constructor(private cookieService:CookieService){

  }

  ngOnInit(){
      const token = this.cookieService.get('auth')
      const decoded: any = jwt_decode(token)
      this.authorId = decoded.data._id
      this.userName = decoded.data.name
  }

  isSidebarOpen: boolean = true; // Start with the sidebar open by default

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
