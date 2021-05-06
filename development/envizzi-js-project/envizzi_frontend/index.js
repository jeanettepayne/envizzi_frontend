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

            document.querySelector('#board-container').innerHTML += boardVisual
        })
    })
}

