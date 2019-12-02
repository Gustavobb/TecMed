import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

function Home() {

  const [items, setItems] = useState();
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [id, setId] = useState('')
  
  
  useEffect(async ()=>{
    await fetch("http://localhost:9000/routes//getContents")
    .then(res =>res.json())
    .then(data =>{
      setItems(data)
      console.log("AAAAAAA")
      console.log(data)
    })
  
  },[])

  
  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const displayItem = (listDisplay) => {
    return(

      listDisplay.map(item => (
        <Card style={{ width: '20rem', marginBottom:'4rem ',marginLeft:"3rem"}}>
        <iframe src={`https://www.youtube.com/embed/${item.videoSpecifications.id}`} />
        <Card.Body style={{color: 'black'}}>
          <Card.Title>{item.videoSpecifications.title}</Card.Title>
          < Card.Text style={{fontSize:'1rem'}}>
            {item.videoSpecifications.category}
          </Card.Text>
          <Link to={"quiz/id="+ item._id} >
            <Button variant="primary">Ir ao quiz</Button>
          </Link>
        </Card.Body>  
      </Card>
      ))
    );

  }


  
  return (
    <div className="Home">
               <Form inline>
                    <FormControl style={{width:"30rem", marginLeft:"30rem"}}type="text" placeholder="Pesquisar" className="mr-sm-2"/>
                    <Button style={{marginLeft:"-4.5rem", backgroundColor:"white", color:"black"}}variant="outline-success">Buscar</Button>
                </Form>
       
        <div className="items">
          {items== undefined ? null : displayItem(items)}
        </div>
    </div>
  );
}

export default Home;
