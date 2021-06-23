import React from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';

// Book List Functional Component
const BookList = (props) => {
	const { books, updateShelf } = props;

  	// Read State
 	const read = books.filter( book => book.shelf === 'read');

  	// Want To Read State
  	const wantToRead = books.filter( book => book.shelf === 'wantToRead');

  	// Currently Reading State
  	const currentlyReading = books.filter( book => book.shelf === 'currentlyReading');

	// Updating Books List
  	const update = (book, shelf) => {
    	updateShelf(book, shelf);
  	};

  	// Return Component
  	return(
    	<div className="list-books">
        	<div className="list-books-title">
          		<h1>MyReads</h1>
        	</div>

        	<div className="list-books-content">
          		<div>
           	 		<BookShelf shelfTitle='Currently Reading' books={ currentlyReading } update={ update }/>

					<BookShelf shelfTitle='Want to Read' books={ wantToRead } update={ update }/>

					<BookShelf shelfTitle='Read' books={ read } update={ update }/>
          		</div>
        	</div>

        	<div className="open-search">
          		<Link to='/search' className='add-btn'> Add a book </Link>
        	</div>
    	</div>
  	);
};

export default BookList;
