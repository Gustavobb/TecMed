# Documentação de rotas

# Boas práticas 

* Código em inglês, comentários em português 
* Separação das rotas e pastas
* Commits claros

# Estrutura das pastas

* src/

  * app/
  
    * controllers/
      
      >Controllers com suas funções, a parte realmente a ser implementada, o que o endpoint implementa, contendo e atualizações com mongo, aws e outros. Usar sempre classes
    
    * models/
      
      >Schema do mongo, cada vez que um novo esquema for criado, deve ser adicionado um arquivo com ele 
      
     * middlewares/
     
        >"Meio de campo" do servidor, não é necessário toda vez, mas se por exemplo, uma ação como autenticação com algum site ou coisas que necessitem parar o servidor para uma tarefa não relacionada ao endpoint em si, deve ser feita nesta pasta como um novo arquivo


  * index.js
    
      >Porta que o server vai rodar, não é necessário mudança
  
  * server.js
  
      >Requires pro express, mongo, routes e inicialização de alguma biblioteca (mongoose, cors, express, não necessária mudança constante). Inicialização como um todo
      
  * routes
      
      >Rotas e endpoints, contendo todos os controllers necessários importados
     
  ### Referencias uteis
  
  ##### Aws:
  
  >https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html
  
  ##### Mongo:
  
  >https://mongoosejs.com/docs/guide.html
