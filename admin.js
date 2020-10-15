   const todoList = document.getElementById('table');
   const form = document.getElementById('form');
  

    form.addEventListener('submit', e => {
      e.preventDefault();
      const namegame = document.getElementById('name').value;
      const stylegame = document.querySelector('input[name="style"]:checked').value;
      const categorygame = document.getElementById('category').value;
      const publishedgame= document.querySelector('input[name="published"]:checked').value =='true'
      const imagengame=document.getElementById('imagen').value;
      const data = { name: namegame, style: stylegame, category: categorygame,publicado:publishedgame,destacado:'no',imgSource:imagengame};
      postNewTodo(data);
      
    })

   

    async function getTodos() {
      const url = 'http://localhost:3000/Games';
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    function buildTodo(Games) {
      Games.map(game => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        ${game.id}
        </td>
        <td>
        ${game.name}
        </td>
        <td>
        ${game.style}
        </td>
        <td>
        ${game.category}
        </td>
        <td>
        ${game.publicado}
        </td>
        <td>
        ${game.destacado}
        </td>
        
        <td>
        <button type="button" class="btndelete text-white"><span class="fas fa-trash-alt"></span>  Borrar</button>
        </td>
        <td>
        <button type="button" class="btnedit text-white"><span class="fas fa-edit"></span>
         Editar</button>
        </td>
        <td>
        <button type="button" class="btndestacado text-white"><span class="fas fa-star"></span>  Destacar</button>
        </td>
      `
        todoList.appendChild(row);
        
      })
    }
    
      
       async function postNewTodo({ name,style,category,publicado,destacado,imgSource}) {
       const url = 'http://localhost:3000/Games';
       const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
       
        body: JSON.stringify({ name,style,category,publicado,destacado,imgSource})
      })
      const newData = await response.json();
      console.log(newData);
      debugger
    }

   
    


    
    

    getTodos().then(Games => buildTodo(Games));
 