import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inventoryData } from '../context';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8056';  // Base URL for your Spring Boot backend

  constructor(private http: HttpClient) {}

  // Fetch all books
  getAllBooks(): Observable<inventoryData[]> {
    return this.http.get<inventoryData[]>(`${this.apiUrl}/showAll`);
  }

  // Fetch book by ID
  getBookById(bookID: number): Observable<inventoryData> {
    return this.http.get<inventoryData>(`${this.apiUrl}/getById/${bookID}`);
  }

  // Add a new book
  addBook(book: inventoryData): Observable<inventoryData> {
    return this.http.post<inventoryData>(`${this.apiUrl}/insert`, book);
  }

  // Update an existing book
  updateBook(bookID: number, book: inventoryData): Observable<inventoryData> {
    return this.http.put<inventoryData>(`${this.apiUrl}/update/${bookID}`, book);
  }

  // Delete a book by ID
  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${bookID}`);
  }
}
