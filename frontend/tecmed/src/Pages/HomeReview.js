import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import axios from 'axios'

function HomeReview() {

  const [items, setItems] = useState();
  const [category, setCategory] = useState('Todos');
  
  // const fakeID = 'wFAtV0bvBRo'
  const fakeUser = 'Dr.Pedro'

  
  useEffect(()=>{
    fetchData()
  },[category])

  const updateCategory = e =>{
    setCategory(e.target.value);
  }

  async function fetchData(){

    if (category === "Todos" ){
      const response = await axios.get(`http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/getUnreviewedVideos/`);
      setItems(response.data)
      console.log("categoria todos")

    }
    else {
      const response = await axios.get(`http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/unreviewedByCategory/`, {params:{category}});
      setItems(response.data)
      console.log("categoria especifica")
    }
    
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
    <div className="HomeReview" >
      <br></br>
      <div>
        <select className="select-box" onChange={updateCategory} >
          <option value="Todos">Todos</option>
          <option value="Dermatologia">Dermatologia</option>
          <option value="Cardiologia">Cardiologia</option>
          <option value="Oncologia">Oncologia</option>
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
