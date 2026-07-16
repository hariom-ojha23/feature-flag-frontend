import { HttpClient, HttpClientCommonOptions } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

type ArrayBufferOptions = {
  observe?: 'body'
  responseType: 'arraybuffer'
} & HttpClientCommonOptions
type BlobOptions = { observe?: 'body'; responseType: 'blob' } & HttpClientCommonOptions
type TextOptions = { observe?: 'body'; responseType: 'text' } & HttpClientCommonOptions
type JsonOptions = { observe?: 'body'; responseType?: 'json' } & HttpClientCommonOptions

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private url = environment.apiUrl
  private apiUrl = this.url + '/api/v1'

  // ---------- GET ----------
  get(endPoint: string, options: ArrayBufferOptions): Observable<ArrayBuffer>
  get(endPoint: string, options: BlobOptions): Observable<Blob>
  get(endPoint: string, options: TextOptions): Observable<string>
  get<T>(endPoint: string, options?: JsonOptions): Observable<T>
  get(endPoint: string, options?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endPoint}`, options)
  }

  // ---------- POST ----------
  post(endPoint: string, body: unknown, options: ArrayBufferOptions): Observable<ArrayBuffer>
  post(endPoint: string, body: unknown, options: BlobOptions): Observable<Blob>
  post(endPoint: string, body: unknown, options: TextOptions): Observable<string>
  post<T>(endPoint: string, body: unknown, options?: JsonOptions): Observable<T>
  post(endPoint: string, body: unknown, options?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endPoint}`, body, options)
  }

  // ---------- PUT ----------
  put(endPoint: string, body: unknown, options: ArrayBufferOptions): Observable<ArrayBuffer>
  put(endPoint: string, body: unknown, options: BlobOptions): Observable<Blob>
  put(endPoint: string, body: unknown, options: TextOptions): Observable<string>
  put<T>(endPoint: string, body: unknown, options?: JsonOptions): Observable<T>
  put(endPoint: string, body: unknown, options?: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endPoint}`, body, options)
  }

  // ---------- PATCH ----------
  patch(endPoint: string, body: unknown, options: ArrayBufferOptions): Observable<ArrayBuffer>
  patch(endPoint: string, body: unknown, options: BlobOptions): Observable<Blob>
  patch(endPoint: string, body: unknown, options: TextOptions): Observable<string>
  patch<T>(endPoint: string, body: unknown, options?: JsonOptions): Observable<T>
  patch(endPoint: string, body: unknown, options?: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${endPoint}`, body, options)
  }

  // ---------- DELETE ----------
  delete(endPoint: string, options: ArrayBufferOptions): Observable<ArrayBuffer>
  delete(endPoint: string, options: BlobOptions): Observable<Blob>
  delete(endPoint: string, options: TextOptions): Observable<string>
  delete<T>(endPoint: string, options?: JsonOptions): Observable<T>
  delete(endPoint: string, options?: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endPoint}`, options)
  }
}
