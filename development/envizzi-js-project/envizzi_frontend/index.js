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
            document.querySelector('#board-container').innerHTML += (`<div data-id=${board.id}>
                    <h2>${board.attributes.title}</h2> 
                </div>`);
                    board.attributes.items.forEach(item => {
                        document.querySelector('#board-container').innerHTML += (`<p>${item.name}</p>`)
                    })


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

    const itemOne = new Item(itemInput);
    const itemTwo = new Item(itemInputTwo);
    const itemThree = new Item(itemInputThree);

    postFetch(titleInput, itemOne, itemTwo, itemThree)
    
}

function postFetch(title, item1, item2, item3) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({board: {
            title: title,
            items: [item1, item2, item3]
        }})
    })
    .then(response => response.json())
    .then(board => {
        console.log(board);
        // const boardData = board.data
    })
}


