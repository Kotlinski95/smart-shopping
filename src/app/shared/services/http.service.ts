import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }

  getSpecificData(id: number): Observable<Post> {
    return this.http.get<Post>(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
  }

  getDataById(id: number): Observable<Array<Post>> {
    const params = new HttpParams().set('userId', `${id}`);
    return this.http.get<Array<Post>>(
      'https://jsonplaceholder.typicode.com/posts/',
      { params: params }
    );
  }
}

interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
