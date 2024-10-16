import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { inventoryData } from '../../context';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: inventoryData = new inventoryData();
  bookID: number | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookID = this.route.snapshot.params['id'];
    if (this.bookID) {
      this.bookService.getBookById(this.bookID).subscribe((data: inventoryData) => {
        this.book = data;
      });
    }
  }

  // Save or Update book
  saveBook(): void {
    if (this.bookID) {
      this.bookService.updateBook(this.bookID, this.book).subscribe(() => {
        alert('Book updated successfully!');
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(this.book).subscribe(() => {
        alert('Book added successfully!');
        this.router.navigate(['/books']);
      });
    }
  }
}
