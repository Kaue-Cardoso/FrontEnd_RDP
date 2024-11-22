import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, EMPTY } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);

  try {
    const token = localStorage.getItem('token');

    if (token && !router.url.includes('/login')) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + token },
      });
    }
  } catch (error) {
    console.error('Erro ao acessar o localStorage:', error);
    router.navigate(['/main/dashboard']);
    return EMPTY; 
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          alert('401 - Não autorizado. Redirecionando...');
          router.navigate(['/main/dashboard']);
        } else if (err.status === 403) {
          alert('403 - Acesso proibido. Redirecionando...');
          router.navigate(['/main/dashboard']);
        } else {
          console.error('Erro HTTP:', err);
        }
      } else {
        console.error('Erro não identificado:', err);
      }

      // Retorna um fluxo vazio para evitar carregamento infinito
      return throwError(() => err);
    })
  );
};
