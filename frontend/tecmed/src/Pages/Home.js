import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios'

function Home() {

  const [items, setItems] = useState();
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [id, setId] = useState('')


  useEffect(()=>{
    fetchData()
  },[category])
  
  
  async function fetchData(){

    if (category === "Todos" ){
      const response = await axios.get(`http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/getContents/`);
      setItems(response.data)
      console.log("categoria todos")

    }
    else {
      const response = await axios.get(`http://localhost/routes/getContentByCategory/`, {params:{category}});
      setItems(response.data)
      console.log("categoria especifica")
    }
    
  }
    

  const updateCategory = e =>{
    setCategory(e.target.value);
 
  }
  const displayItem = (listDisplay) => {     
    return(
      listDisplay.map(item => (
        <Card style={{ width: '20rem', marginBottom:'4rem ',marginLeft:"3rem", backgroundColor: "#ADD6FF"}}>
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
        <div>
          <center><Form.Control as="select" onChange={updateCategory} style={{width: "30%"}}>
          <option value="Todos">Todos</option>
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


          </Form.Control></center>        
          <div className="items">
            {items== undefined ? null : displayItem(items)}
          </div>

      </div>
    </div>
  );
}

export default Home;
