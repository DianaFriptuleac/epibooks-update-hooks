import { useState} from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";

const BookList = ({booksArray}) =>{
  // BookList nasce per ricevere dalle props un ARRAY di libri!
  // chiameremo questa prop... booksArray

  // le props nei componenti a classe si recuperano dentro "this.props"

  //state = {
   // searchBook: "",
    //selectedBookAsin: '', // Stato per tracciare il libro selezionato, posso mettere anche null
  //};

  const [searchBook, setSearchBook] = useState('')
  const [selectedBookAsin, setSelectedBookAsin] = useState('')

  //cambiamento del campo di recerca
  const handleSearch = (e) => {
    setSearchBook(e.target.value)
  };

  //filtro i libri
  const filtraLibri = () => {
    if(!booksArray) return []
  return booksArray.filter((book) =>
      book.title.toLowerCase().includes(searchBook.toLowerCase())
    );
  };
  // Gestione della selezione del libro
  const handleBookSelection = (asin) => {
    setSelectedBookAsin((prevAsin) => (prevAsin === asin ? '' : asin));
   }
  

    const filteredBook = filtraLibri();
    return (
      <Container fluid className="mx-1">
        <Row>
          {/* Colonna dei libri */}
          <Col xs={12} md={8}>
            <Row>
              <Col className="my-3 d-flex justify-content-center">
                <Form.Control
                  type="text"
                  placeholder="Cerca titolo libro"
                  className="w-75"
                  value={searchBook}
                  onChange={handleSearch}
                />
              </Col>
            </Row>
            <Row className="gy-4">
              {filteredBook.map((scifiBook) => (
                <SingleBook
                  key={scifiBook.asin}
                  libro={scifiBook}
                  isSelected={selectedBookAsin === scifiBook.asin}
                  onBookClick={() => handleBookSelection(scifiBook.asin)}
                />
              ))}
            </Row>
          </Col>

          {/* Colonna di CommentArea */}
          <Col xs={12} md={4}>
            {selectedBookAsin ? (
              <CommentArea asin={selectedBookAsin} />
            ) : (
              <h4 className="mt-2">Selezionare un libro per i commenti</h4>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

export default BookList;
