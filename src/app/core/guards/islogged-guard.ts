import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isloggedGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const router = inject(Router)

  if(cookieService.get('token')){
    return router.parseUrl('/home'); //law msagel dkhoul a navigate to home 
  }
  else{
    return true // law no take him back to login
  }
};
