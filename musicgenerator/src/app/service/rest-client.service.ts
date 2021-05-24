import { Injectable } from '@angular/core';
import { Song } from './class/song';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError('An error has occurred');
  }

  private get<T>(url): Observable<T> {
    console.log('get:', url);
    return this.http
      .get<T>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  private post<T>(url, data: T): Observable<T> {
    console.log('post:', url);
    return this.http
      .post<T>(url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  getLyrics() {
    const url = `${environment.serviceBaseUrl}/lyrics`;
    return this.get(url);
  }

  createSong(song: Song) {
    const url = `${environment.serviceBaseUrl}/song`;
    return this.post(url, {
      music: {
        bpm: song.bpm,
        root: song.root,
        scale: song.scale,
        n_chords: song.n_chords,
        progression: song.progression,
        n_beats: song.n_beats,
        structure: song.structure
      }
    });
  }

  createMusic(song: Song) {
    const url = `${environment.serviceBaseUrl}/music`;
    return this.post(url, {
      bpm: song.bpm,
      root: song.root,
      scale: song.scale,
      n_chords: song.n_chords,
      progression: song.progression,
      n_beats: song.n_beats,
      structure: song.structure
    });
  }
}
