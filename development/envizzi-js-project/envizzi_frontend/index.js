const endPoint = "http://localhost:3000/api/v1/boards"

class Board {
    static all = []

    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.items = []

        Board.all.push(this)
    }

    addItem(item){
        const newItem = new Item(item.name)
        this.items.push(newItem)
    }
}


class Item {
    static all = []

    constructor(name, id) {
        this.id = id;
        this.name = name

        Item.all.push(this)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getBoards();

    const createBoardForm = document.querySelector("#create-board-form")

    createBoardForm.addEventListener("submit", (e) => createFormHandler(e))
});

function getBoards() {
    fetch(endPoint)
    .then(response => response.json())
    .then(boards => {
        boards.data.forEach(board => {
            document.querySelector('#board-container').insertAdjacentHTML('beforeend', `<div id=board-${board.id}>
                    <h2>${board.attributes.title}</h2> 
                </div>`);
                    board.attributes.items.forEach(item => {
                        document.querySelector(`#board-${board.id}`).insertAdjacentHTML('beforeend', `<p>${item.name}</p>`)
                    })
                    const button = document.createElement('button');
                    button.setAttribute('id', `button-${board.id}`)
                    button.insertAdjacentHTML('beforeend', "Remove Board")
            
                    document.querySelector(`#board-${board.id}`).append(button)
                    document.querySelector(`#button-${board.id}`).addEventListener("click", (e) => {
                        deleteBoard(board)
                    })
            })
            
        })
    }


function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const itemInput = document.querySelector("#input-item-name").value
    const itemInputTwo = document.querySelector("#input-item-name-2").value
    const itemInputThree = document.querySelector("#input-item-name-3").value

    postFetch(titleInput, itemInput, itemInputTwo, itemInputThree)
    
}


function postFetch(title, item1, item2, item3) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({board: {
            title: title,
            items:[item1, item2, item3] 
        }}
        )
    })
    .then(response => response.json())
    .then(board => {
        console.log(board);
        document.querySelector('#board-container').insertAdjacentHTML('beforeend', `<div id=board-${board.id}>
                <h2>${board.data.attributes.title}</h2> 
            </div>`);
                board.data.attributes.items.forEach(item => {
                    document.querySelector(`#board-${board.id}`).insertAdjacentHTML('beforeend', `<p>${item.name}</p>`)
                })
                const button = document.createElement('button');
                    button.setAttribute('id', `button-${board.id}`)
                    button.insertAdjacentHTML('beforeend', "Remove Board")
        
                    document.querySelector(`#board-${board.id}`).append(button)
                    document.querySelector(`#button-${board.id}`).addEventListener("click", (e) => {
                        deleteBoard(board)
                    })
        location.reload();           
    })
    
}

function deleteBoard(board) {
     fetch(`http://localhost:3000/api/v1/boards/${board.id}`, {
        method: 'DELETE'
    })
    .then(() => {
        document.getElementById(`board-${board.id}`).remove()
        Board.all = Board.all.filter(board => board.id !== this.id)
    })
    
}


