import React from 'react';

import Book from './Book';

// BookShelf Functional Component
const BookShelf = (props) => {
	// Handling Shelf Updates
    const update = (book, shelf) => {
    	props.update(book, shelf);
	};

  	// Returning Component
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ props.shelfTitle }</h2>

            <div className="bookshelf-books">
                <ol className="books-grid">
                { props.books.map( (book, index) => (
					<li key={ index }> <Book book={ book } update={ update } /> </li>
                  ))
                }
                </ol>
            </div>
        </div>
    );
};

export default BookShelf;
