import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import axios from 'axios'

function HomeReview() {

  const [items, setItems] = useState();
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Psicologia');
  
  const fakeID = 'wFAtV0bvBRo'
  const fakeUser = 'Dr.Pedro'

  
  useEffect(async ()=>{

    const response = await axios.get("http://localhost:9000/routes/unreviewedByCategory", 'Psicologia');
    console.log(response)
    const data = response.json();
    setItems(data)
    console.log("AAAAAAA")
    console.log(data)
  
  },[category])

  
  const updateCategory = e =>{
    setCategory(e.target.value);
    setQuery('');
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const displayItem = (listDisplay) => {
    return(

      listDisplay.map(item => (
        <Card style={{ width: '20rem', marginBottom:'4rem ',marginLeft:"3rem"}}>
        <iframe src={`https://www.youtube.com/embed/${fakeID}`} />
        <Card.Body style={{color: 'black'}}>
          <Card.Title>{item.videoSpecifications.title}</Card.Title>
          < Card.Text style={{fontSize:'1rem'}}>
            {item.videoSpecifications.category}
          </Card.Text>
          <Link to={`/review/VideoId=${fakeID}&usr=${fakeUser}`} >
            <Button variant="primary">Revisar</Button>
          </Link>
        </Card.Body>  
      </Card>
      ))
    );

  }


  
  return (
    <div className="HomeReview">

      <select className="selectOpt" onChange={updateCategory}>
        <option value="Psicologia">Psicologia</option>
        <option value="Psicologia">Psicologia</option>

      </select>
       
        <div className="items">
          {items== undefined ? null : displayItem(items)}
        </div>
    </div>
  );
}

export default HomeReview;
