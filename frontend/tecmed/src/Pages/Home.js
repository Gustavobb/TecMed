import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import CardContent from '../Components/CardContent'
import mock from '../mock.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Home() {

  
  const [items] = useState(mock);
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  

  console.log('Puxado: ', mock)
  console.log('Categoria: ', category)
  console.log("Display: ", display)
  

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
        <Card style={{ width: '18rem', marginBottom:'4rem '}}>
        <iframe src="https://www.youtube.com/embed/xDMP3i36naA" />
        <Card.Body style={{color: 'black'}}>
          <Card.Title>{item.Title}</Card.Title>
          < Card.Text style={{fontSize:'1rem'}}>
            {item.Title}
          </Card.Text>
          <Button variant="primary">Ir ao quiz</Button>
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
        <form onSubmit={getSearch} className="search-form">
          <select className="selectOpt" onChange={updateCategory}>
            <option value="all">Todas as categorias</option>
            <option value="c1">Categoria 1</option>
            <option value="c2">Categoria 2</option>            
          </select>
          
          <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder='Digite aqui para pesquisar'/>
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        
        <div className="items">
          {displayItem(display)}
        </div>
    </div>
  );
}

export default Home;
