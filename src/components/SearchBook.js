import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Book from './Book';

// Search Book => Class Component
class SearchBook extends Component{
    state = {
        query: '',
        error: false,
    };

    books = this.props.books;

    searchedBooks = [];

  	// Handling Query
    handleQuery = (event) => {
        this.setState({ query: event.target.value });
        this.searchBook(event.target.value);
    }

  	// Searching For a Book
    searchBook = (query) => {
      let temporarySearchBooks =[];

      query === '' ?
        this.books = [] :
        BooksAPI.search(query)
        .then((data) => {
          if(typeof data !== 'undefined') {
            this.searchedBooks = Array.isArray(data) ? data : data.items;
            this.searchedBooks.forEach(book => {
              let temporaryBook = {};
              BooksAPI.get( book.id )
              .then( result => {
                temporaryBook = result;
                temporaryBook.shelf = result.shelf;
                temporarySearchBooks.push(temporaryBook);
                this.books = temporarySearchBooks;
              } )
            });
            this.setState({
              error: this.searchedBooks.length === 0
            })
          }
        })
  	};

  	// Update Shelf
    update = (book, shelf) => {
      this.props.updateShelf(book, shelf);
    };

  	// Render Component
    render() {
        return(
            <div className="search-books">
            	<div className="search-books-bar">
              		<Link to='/' className='close-search'> Close </Link>

              		<div className="search-books-input-wrapper">
                		<input
          					type="text"
          					onChange={ this.handleQuery }
  							value={ this.state.query }
  							placeholder="Search by title or author"
  						/>
              		</div>
            	</div>

            	<div className="search-books-results">
              		<ol className="books-grid">
              			{ this.state.error && 'No record found.' }
              			{ !this.state.error && this.books.filter( book => book.imageLinks).map((book, index) => {
                			return(
                  				<li key={ index }>
                      				<Book book={ book } update={this.update} />
                  				</li>
                			)
              			})}
              		</ol>
            	</div>
          	</div>
		);
    }
};

export default SearchBook;
