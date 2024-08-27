import { Container, Row, Col, Form } from "react-bootstrap";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { useState } from "react";

const BookList = ({ libri }) => {
  //  state = {
   // searchBook: "",
  //  selectedBookAsin: '', // Stato per tracciare il libro selezionato, posso mettere anche null
  //};
  const [searchBook, setSearchBook] = useState("");
  const [selectedBookAsin, setSelectedBookAsin] = useState("");

    //cambiamento del campo di recerca
  const handleSearch = (e) => {
    setSearchBook(e.target.value);
  };
//filtro i libri
  const filtraLibri = () => {
    return libri.filter((book) =>
      book.title.toLowerCase().includes(searchBook.toLowerCase())
    );
  };
  // Gestione della selezione del libro
  //handleBookSelection = (asin) => {
   // if(this.state.selectedBookAsin === asin){
   //  this.setState({selectedBookAsin:''})
   // }else{
   //  this.setState({selectedBookAsin: asin})
   // }
   
  const handleBookSelection = (asin) => {
    setSelectedBookAsin((prev) => (prev === asin ? "" : asin));
  };

  const filteredBook = filtraLibri();

  return (
    <Container fluid className="mx-1">
      <Row>
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
                onBookClick={handleBookSelection}
              />
            ))}
          </Row>
        </Col>

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
};

export default BookList;


