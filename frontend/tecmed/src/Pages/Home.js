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
  const [category, setCategory] = useState('Todos');
  const [id, setId] = useState('')
  
  
  useEffect(async ()=>{
    if (category === "Todos"){
    await fetch("http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/getContents")
    .then(res =>res.json())
    .then(data =>{
      setItems(data)
      console.log("AAAAAAA")
      console.log(data)
    })
    }
    else{
      await fetch("http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/getContentByCategory", {params:{category}})
      .then(res =>res.json())
      .then(data =>{
        setItems(data)
        console.log("AAAAAAA")
        console.log(data)
      })
      }
    
  },[])

  
  const handleSearch = e => {
    setSearch(e.target.value);
    
  };

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
        <select className="select-box" style={{backgroundColor:"white"}} onChange={updateCategory}>
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


        </select>
        
          <div className="items">
            {items== undefined ? null : displayItem(items)}
          </div>

      </div>
       
        <div className="items">
          {items== undefined ? null : displayItem(items)}
        </div>
    </div>
  );
}

export default Home;
