var editmode = false
var Id

function getToken(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
             }

            return cookieValue;}

 const csrftoken = getToken('csrftoken');



var todoListDisplay = document.getElementById('todo-list-display')

fetch('/api/list/todo/')
.then(response => response.json())
.then(data => {
	var list = data;
	displayTodo(list);
	updateTodo(list);
	deleteTodo(list);
	markUnmark(list);
		})

function displayTodo (list){
	for( var i = 0; i < list.length; i++){

		if(list[i].user == user){

		todoContent = `<span>${list[i].content}</span>`

		if (list[i].completed == true){
			todoContent = `<strike>${list[i].content}</strike>`
		}

		var oneTodo = `
			<div class = "list-wrapper entire-wrapper">
				<div data-id=${list[i].id} class ="mark-complete" style="flex:7">
					${todoContent}
				</div>
				<div style='justify-content:flex-end; display: flex'>
				<div style="flex:1" class ="mr-1">
					<button data-id=${list[i].id} class = "update-todo-button btn btn-outline-success">Edit</button>
				</div>
				<div style="flex:1">
					<button data-id=${list[i].id} class = "delete-todo-button btn btn-outline-dark">-</button>
				</div>
				</div>

			</div>`
			

		todoListDisplay.innerHTML += oneTodo
		}

	}
}


function updateTodo(list){
	var editTodo = document.getElementsByClassName('update-todo-button')

	for( var i = 0; i < list.length; i++){

		try{

			editTodo[i].addEventListener("click", function(){

				editmode = true
				Id = this.dataset.id
				url = `/api/detail/todo/${Id}/`

				fetch(url)
				.then(response => response.json())
				.then(data => { form['title']['value'] = data['content']})

			})

		}catch(error){
			// Ignore 
		}


	}
}


function deleteTodo(list){
	var todoDelete = document.getElementsByClassName('delete-todo-button')

	for( var i = 0; i < list.length; i++){

		try{

			todoDelete[i].addEventListener("click", function(){

				Id = this.dataset.id
				url = `/api/delete/todo/${Id}/`

				fetch(url,{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
			    		'X-CSRFToken' : csrftoken,
	    			}})
				.then(response => response.json())
				.then(data => document.location.reload(true))

			})
		}catch(error){
			// Ignore 
		}

	}

}

function markUnmark(list){
	var completeTodo = document.getElementsByClassName("mark-complete")
	for( var i = 0; i < list.length; i++){

		try{

			completeTodo[i].addEventListener("click", function(){

				Id = this.dataset.id
				urlDetail = `/api/detail/todo/${Id}/`

				fetch(urlDetail)
				.then(response => response.json())
				.then(data =>  {
					var item = data;
					var invertedCompleted = !item.completed
					item = {"content": item.content, "completed": invertedCompleted}
					url = `/api/update/todo/${Id}/`

					fetch(url,{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
			    			'X-CSRFToken' : csrftoken,
			    		},
			    		body: JSON.stringify(item)
						})
					.then(response => response.json())
					.then(data => document.location.reload(true))
				})	
			})
		}catch(error){
			// Ignore 
		}
	}
}


var form = document.getElementById('form')
form.addEventListener('submit', function(e){
	e.preventDefault()

	var content = form['title']['value']

	if(editmode == false){
		

		fetch('/api/add/todo/',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
    		'X-CSRFToken' : csrftoken,
    	},
    	body: JSON.stringify({
	        "content": content,
	        "completed": false })
		})
		.then(response => response.json())
		.then(data => document.location.reload(true))
	}else if(editmode == true){

		console.log(Id)
		url = `/api/update/todo/${Id}/`
		
		

		fetch(url,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
    		'X-CSRFToken' : csrftoken,
    	},
    	body: JSON.stringify({
	        "content": content,
	        "completed": false })
		})
		.then(response => response.json())
		.then(data => document.location.reload(true))

	}

})



