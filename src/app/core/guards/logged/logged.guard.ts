import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const loggedGuard: CanActivateFn = (route, state) => {
  const pLATFORM_ID=inject(PLATFORM_ID);
  const router=inject(Router);

  if(isPlatformBrowser(pLATFORM_ID)){
    if(localStorage.getItem('userToken')){
      router.navigate(['/home']);
      return false;
    }
   
    return true;
  }else{
    return false;
  }
};
