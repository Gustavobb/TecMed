import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import axios from 'axios'

function HomeReview() {

  const [items, setItems] = useState();
  const [category, setCategory] = useState('');
  
  // const fakeID = 'wFAtV0bvBRo'
  const fakeUser = 'Dr.Pedro'

  
  useEffect(()=>{
    fetchData()
  },[category])

  async function fetchData(){
    const response = await axios.get(`http://localhost:9000/routes/unreviewedByCategory/`, {params:{category}});
    setItems(response.data)
  }

  
  const updateCategory = e =>{
    setCategory(e.target.value);
  }


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
          <Link to={`/review/VideoId=${item._id}&usr=${fakeUser}`} >
            <Button variant="primary">Revisar</Button>
          </Link>
        </Card.Body>  
      </Card>
      ))
    );

  }


  
  return (
    <div className="HomeReview">
      <div>
        <select className="select-box" onChange={updateCategory}>
          <option value="Dermatologia">Dermatologia</option>
          <option value="Cardiologia">Cardiologia</option>
          <option value="Câncer">Câncer</option>
          <option value="Pneumologia">Pneumologia</option>
          <option value="Neurologia">Neurologia</option>
          <option value="Psicologia">Psicologia</option>
          <option value="Fisioterapia">Fisioterapia</option>
          <option value="Clínica Geral">Clínica Geral</option>
          <option value="Cirurgia Plástica">Cirurgia Plástica</option>
          <option value="Outro">Outro</option>


        </select>
        
          <div className="items">
            {items== undefined ? null : displayItem(items)}
          </div>

      </div>
    </div>
  );
}

export default HomeReview;
