import { error } from 'console';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const ts = inject(ToastrService)

  return next(req).pipe(catchError((err)=>{
    ts.error(err.error.message)  //logic 

    return throwError( ()=>err)
  }));
};
