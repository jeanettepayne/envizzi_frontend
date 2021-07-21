const endPoint = "http://localhost:3000/api/v1/boards"

// class Board {
//     constructor(board) {
//         this.id = board.id;
//         this.title = board.title;
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    console.log(`Okay, it's loaded and working`);
    getBoards();
});


// function getBoards() {
//     fetch(endPoint)
//     .then(response => response.json())
//     .then(boards => {
//         boards.data.forEach(board => {
//             const boardVisual = `
//                 <div data-id=${board.id}>
//                     <h2>${board.attributes.title}</h2>
//                 </div> `);

//         console.log(boardVisual);

        // board.attributes.items.forEach(item => {
        //     const itemVisual = `
        //     <div item-id=${item.id}></div>
        //         <p>${item.name}</p>`
        //  })
const itemVisual = board.data.attributes.items.forEach(item => {
    item.name
})

// const boardVisual = `<div data-id=${board.id}>
// <h2>${board.attributes.title}</h2>
// board.data.attributes.items.forEach(item => {
//     item.name
// }) 
// </div>`

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


// board.attributes.items.forEach(item => {
//     document.querySelector('#item-container').innerHTML += (`${item.name}`)

/* <p>`${board.attributes.items.forEach(item => {
        item.name }</p> */