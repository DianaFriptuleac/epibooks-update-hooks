import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const AddComment = ({ asin, changeUpdateCommentsList }) => {
  const [personalComment, setPersonalComment] = useState({
    comment: "",
    rate: "",
    elementId: asin,
  });
//aggiorno elementId ogni volta che cambia la prop asin
  useEffect(() => {
    setPersonalComment((prev) => ({
      ...prev,
      elementId: asin,
    }));
  }, [asin]);
  //componentDidUpdate = (prevProps) => {
   // if (prevProps.asin !== this.props.asin) {
      // ora manteniamo aggiornato elementId in this.state.personalComment
     // this.setState({
     //   personalComment: {
       //   ...this.state.personalComment,
        //  elementId: this.props.asin,
          // ora l'asin nello state è aggiornato con il valore ricevuto nelle props
          // (valore che abbiamo ricevuto quando abbiamo cliccato su un nuovo libro)
        //},
     // });
    //}
  //}

  const handleInputChange = (e, property) => {
    setPersonalComment((prev) => ({
      ...prev,
      [property]: e.target.value,
    }));
  };

 // handleInputChange = (e, property) => {
   // this.setState({
     // personalComment: {
      //  ...this.state.personalComment,  //modo in cui trascinare qui dentro tutto il contenuto di un altro oggetto
      //  [property]: e.target.value,
     // }
   // });
  //};

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        headers: {
          Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjQzMjc1NjQsImV4cCI6MTcyNTUzNzE2NH0.g888918CD5qke7EIIwh90BjBGeHnwAIHTubT-bzC7fI",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalComment),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nella chiamata API!");
          }
        })
        .then(() => {
          alert("Commento salvato!");
          changeUpdateCommentsList();
          setPersonalComment({
            comment: "",
            rate: "",
            elementId: asin,
          });
        })
        .catch((err) => {
          console.error("Errore:", err);
          alert("Errore: " + err.message);
        });
    };
  
    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Punteggio</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => handleInputChange(e, "rate")}
                  value={personalComment.rate}
                >
                  <option value="">Seleziona un voto</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Scrivi il tuo commento</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  onChange={(e) => handleInputChange(e, "comment")}
                  value={personalComment.comment}
                />
              </Form.Group>
              <div className="d-flex justify-content-center mb-3">
                <Button variant="success" type="submit" className="mt-3">
                  Invia Commento
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default AddComment;