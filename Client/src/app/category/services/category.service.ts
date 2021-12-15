import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.baseURL+'category';

  constructor(private http: HttpClient) { }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, category);
  }

  updateCategory(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateUploadCategory(id: number, category: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCategoriesList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-categories/${id}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
