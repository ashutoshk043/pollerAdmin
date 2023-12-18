import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService)
  const router = inject(Router)
  const token = cookieService.get('auth')
  if (token) {
    const decoded: any = jwt_decode(token)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp !>= currentTime) {
      // console.log("a")
      return true;
    } else {
      // console.log("b")
      return false
    }

  } else {
    //  console.log("b")
    router.navigate([''])
    return false;
  }

};
