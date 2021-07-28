const endPoint = "http://localhost:3000/api/v1/boards"

class Board {
    constructor(board) {
        this.id = board.id;
        this.title = board.title;
        this.item = board.item
    }
}

class Item {
    constructor(item) {
        this.name = item.name
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

    postFetch(titleInput, itemInput)
    
}

function postFetch(title, item) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            item: item
        })
    })
    .then(response => response.json())
    .then(board => {
        console.log(board);
        const boardData = board.data
    })
}