import { Component } from '@angular/core';
import { RandomColorService } from 'src/app/services/random-color.service';
import { TitleService } from 'src/app/services/title.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  randomColors: any
  newTitle: any

  constructor(
    private randomColor: RandomColorService,
    private titleService: TitleService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.randomColors = this.randomColor.getRandomColor();
  }

  currDate = new Date()


  ngOnInit() {
    this.titleService.title$.subscribe(title => {
      this.newTitle = title;
    });
  }

  logout() {
    this.cookieService.delete('auth');
    this.router.navigate(['login'])
    this.toastr.success('Logged Out Successfully !!!')
  }



}
