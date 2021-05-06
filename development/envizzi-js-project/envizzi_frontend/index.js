const endPoint = "http://localhost:3000/api/v1/boards"

document.addEventListener('DOMContentLoaded', () => {
    getBoards();
})

function getBoards() {
    fetch(endPoint)
    .then(response => response.json())
    .then(boards => {
        boards.data.forEach(board => {
            const boardVisual = `
            <div data-id=${board.id}>
                <h2>${board.attributes.title}</h2>
            </div> `;

        board.attributes.items.forEach(item => {
            const itemVisual = `
            <div item-id=${item.id}></div>
                <p>${item.name}</p>`
         })


            document.querySelector('#board-container').innerHTML += boardVisual 
            document.querySelector('#board-container').innerHTML += itemVisual

        })
    })
}

