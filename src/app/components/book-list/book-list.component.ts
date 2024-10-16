import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { inventoryData } from '../../context';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: inventoryData[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }

  // Navigate to edit form with book data
  editBook(bookID: number): void {
    this.router.navigate([`/edit/${bookID}`]);
  }

  // Delete a book
  deleteBook(bookID: number): void {
    this.bookService.deleteBook(bookID).subscribe(() => {
      this.books = this.books.filter(book => book.bookID !== bookID);
      alert('Book deleted successfully!');
    });
  }
}
