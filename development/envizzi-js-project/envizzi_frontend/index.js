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

    render() {

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
    console.log(`Okay, it's loaded and working`);
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
                    // button.addEventListener("click", (e) => {
                    //     console.log('delete button')
                    //     deleteBoard(e)
                    // })
                    document.querySelector(`#board-${board.id}`).append(button)
                    document.querySelector(`#button-${board.id}`).addEventListener("click", (e) => {
                        deleteBoard(board)
                    })


                    // document.querySelector('#board-container').append(<button data-id=${board.id} onclick="deleteBoard()">Remove Board</button>)
                    // document.querySelector('#board-container').append(`<button type="button" onclick="deleteBoard()">Remove Board</button>`)
            })
            
        })
        // document.querySelector('#board-container').innerHTML += boardVisual;
    }


function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const itemInput = document.querySelector("#input-item-name").value
    const itemInputTwo = document.querySelector("#input-item-name-2").value
    const itemInputThree = document.querySelector("#input-item-name-3").value

    // const itemOne = new Item(itemInput);
    // const itemTwo = new Item(itemInputTwo);
    // const itemThree = new Item(itemInputThree);

    // let itemsCollection = [];
    // itemsCollection.push(itemOne);
    // itemsCollection.push(itemTwo);
    // itemsCollection.push(itemThree);

    // console.log(itemsCollection);

    // postFetch(titleInput, itemsCollection)

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
                    
    })
}

function deleteBoard(board) {
    const boardID = document.querySelector(`#board-${board.id}`)

    fetch(`http://localhost:3000/api/v1/boards/${board.id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => {
        const selectedBoard = document.querySelector(`#board-${board.id}`)
        selectedBoard.remove()
    })
}


