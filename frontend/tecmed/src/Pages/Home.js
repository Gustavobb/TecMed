import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import CardContent from '../Components/CardContent'
import mock from '../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';


function Home() {


  const [items, setItems] = useState(mock);
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  

  console.log('Puxado: ', mock)
  console.log('Categoria: ', category)
  console.log("Display: ", display)
  
  useEffect(()=>{
    fetch("http://localhost:9000/routes/videos")
    .then(res =>res.json())
    .then(data =>{
      setItems(data)
    })
  },[])
  
  useEffect( () => {
    UpdateDisplay()
  }, [query, category]);
  
  const updateSearch = e => {
    setSearch(e.target.value);
  };
  
  const updateCategory = e =>{
    e.preventDefault();
    setCategory(e.target.value);
    UpdateDisplay();
    setQuery('');
  }
  
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  
  const displayItem = (listDisplay) => {
    return(
      listDisplay.map(item => (
        <Card style={{ width: '20rem', marginBottom:'4rem ',marginLeft:"3rem"}}>
        <iframe src="https://www.youtube.com/embed/wFAtV0bvBRo" />
        <Card.Body style={{color: 'black'}}>
          <Card.Title>{item.Title}</Card.Title>
          < Card.Text style={{fontSize:'1rem'}}>
            {item.Title}
          </Card.Text>
          <Link to='/test/:id'>
            <Button variant="primary">Ir ao quiz</Button>
          </Link>
        </Card.Body>  
      </Card>
      ))
    );
  }

  const UpdateDisplay = () => {
    const d = items.filter((card) =>{
      if (category !== "all"){
        if(card.c === category){
          return true;
        }
        return false
      }
      return true
    });

    setDisplay(d)
  }
  
  return (
    <div className="Home">
       
        <div className="items">
          {displayItem(display)}
        </div>
    </div>
  );
}

export default Home;
