
import React from 'react';

// Book Functional Component
const Book = (props) => {
	// Handling Book Changes
  	const change = (event) => {
    	props.update(props.book, event.target.value)
  	};

	const { book } = props;

	// Return Component
  	return(
    	<div className="book">
      		<div className="book-top">
        		<div
      				className="book-cover"
      				style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}
				></div>

     			<div className="book-shelf-changer">
					<select
						value={ book.shelf }
						onChange={ change }
					>
                    	<option value="move" disabled>Move to...</option>
                    	<option value="currentlyReading">Currently Reading</option>
                    	<option value="wantToRead">Want to Read</option>
                    	<option value="read">Read</option>
                    	<option value="none">None</option>
                  	</select>
        		</div>
      		</div>

			<div className="book-title">{book.title}</div>

			<div className="book-authors"> { book.authors && book.authors.map( author => author+' \n') } </div>
    </div>
  );
};

export default Book;
