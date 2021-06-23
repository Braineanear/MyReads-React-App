import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './components/BookList';
import SearchBook from './components/SearchBook';

// Main Class Component
class BooksApp extends Component {
	state = {
    	books: [],
  	};

  	componentDidMount() {
    	BooksAPI.getAll()
    	.then( data => {
    		this.setState({ books: data })
    	});
  	};

 	// Updating Shelf
  	updateShelf = (book, shelf) => {
    	let success = false;

    	BooksAPI.update(book, shelf)
    	.then( result => {
      		if(shelf === 'none') {
        		success = result.hasOwnProperty(book.shelf) && result[book.shelf].includes(book.id) ? false : true;
      		} else {
        		success = result.hasOwnProperty(shelf) && result[shelf].includes(book.id) ? true : false;
      		}

      		if(success) {
        		let temporaryBooks = [...this.state.books];
        		const bookUpdate = temporaryBooks.filter( temporaryBook => temporaryBook.id === book.id);

        		if(bookUpdate.length > 0 ) {
          			bookUpdate[0].shelf = shelf;

         		 	this.setState({ books: temporaryBooks });
        		} else {
          			temporaryBooks = [...temporaryBooks, book];

          			this.setState({ books: temporaryBooks });
        		}
      		}
		});
	};

  	// Render Component
  	render() {
    	return (
      		<div className="app">
        		<Route path='/search'
        			component={ () =>
        				<SearchBook
          					updateShelf={ this.updateShelf }
          					books={ this.state.books }
          				/>
        			}
				/>

        		<Route exact
        			path='/'
        			component={ () =>
        				<BookList
         	 				books={ this.state.books }
          					updateShelf={ this.updateShelf }
          				/>
        			}
				/>
      		</div>
    	);
  	};
};

export default BooksApp;
