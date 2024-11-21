import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);


  const token = localStorage.getItem('token');
  if (token && !router.url.includes('/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
        
          if (!router.url.includes('/dashboard')) {
            router.navigate(['/dashboard']);
          }
        } else if (err.status === 403) {

          if (!router.url.includes('/dashboard')) {
            router.navigate(['/dashboard']);
          }
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
