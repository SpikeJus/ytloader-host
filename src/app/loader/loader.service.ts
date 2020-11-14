import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private MAIN_URL;
  private GET_VIDEO_URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private url: string;

  constructor(private http: HttpClient) {
    this.MAIN_URL = 'http://localhost:4201/';
    this.GET_VIDEO_URL = 'http://localhost:4201/video';
  }

  sendUrlRequest(): void {

  }

  getMessages(): Observable<any> {
    return this.http.get<any>(this.MAIN_URL)
    .pipe(map( (data: any) => {
      console.log('getMessages res: ', data);
      return data;
    }));
  }

  getVideoFromServer(urlInput: string): Observable<any> {
    let res;
    if (urlInput) {
      const body = { url: urlInput };
      res = this.http.post(this.GET_VIDEO_URL, body, {responseType: 'blob', observe: 'response' });
    }
    return res;
  }

}
