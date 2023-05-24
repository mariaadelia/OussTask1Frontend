import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../model/User';

const getUrl = 'http://localhost:8080/api/form/show';
const postUrl = 'http://localhost:8080/api/form/post';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private http: HttpClient){}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(getUrl);
  }

  createUsers(data:User): Observable<User>{
    return this.http.post<User>(postUrl,JSON.stringify(data),this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
