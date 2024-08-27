import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AddComment = ({asin, changeUpdateCommentsList})=> {
  //state = {
   // personalComment: {
    //  comment: '',
   //   rate: '',
    //  elementId: this.props.asin,  //prendo this.props.asin da  fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}` del CommentArea
   // }
  //};

  const [personalComment, setPersonalComment] = useState({
    comment: '',
    rate: '',
    elementId: asin, 
  })

  //aggiorno elementId nel personalComment quando asin cambia
  useEffect(() => {
    setPersonalComment((prevComment) => ({
      ...prevComment,
      elementId: asin,
    }))
  },[asin])

  //componentDidUpdate = (prevProps) => {
    //if (prevProps.asin !== this.props.asin) {
      // ora manteniamo aggiornato elementId in this.state.personalComment
     // this.setState({
       // personalComment: {
        //  ...this.state.personalComment,
         // elementId: this.props.asin,
          // ora l'asin nello state è aggiornato con il valore ricevuto nelle props
          // (valore che abbiamo ricevuto quando abbiamo cliccato su un nuovo libro)
       // },
     // });
   // }
 // }

  const handleInputChange = (e, property) => {
   // this.setState({
     // personalComment: {
     //   ...this.state.personalComment,  //modo in cui trascinare qui dentro tutto il contenuto di un altro oggetto
      //  [property]: e.target.value,
      //}
    //});

    setPersonalComment((prevComment) =>({
      ...prevComment,
      [property]:e.target.value,
    }))
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit chiamato con:", this.state.personalComment);
    fetchComments()
 }
const fetchComments = () =>{
    fetch("https://striveschool-api.herokuapp.com/api/comments/", {
      method: 'POST',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjQzMjc1NjQsImV4cCI6MTcyNTUzNzE2NH0.g888918CD5qke7EIIwh90BjBGeHnwAIHTubT-bzC7fI",
        'Content-Type': 'application/json',  //sempre questo
      },
      body: JSON.stringify(this.state.personalComment),
    })
    .then((response) => {
        console.log("Risposta della chiamata:", response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella chiamata API!");
        }
      })
      .then((data) => {
        console.log("Dati ricevuti:", data);
        alert('Commento salvato!');

        changeUpdateCommentsList()
        setPersonalComment({
          personalComment: {
            comment: '',
            rate: '',
            elementId: asin,
          },
        });
      })
      .catch((err) => {
        console.error('Errore:', err);
        alert('Errore: ' + err);
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
                  onChange={(e) => handleInputChange(e, 'rate')}
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
                  onChange={(e) => handleInputChange(e, 'comment')}
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
  }


export default AddComment;
