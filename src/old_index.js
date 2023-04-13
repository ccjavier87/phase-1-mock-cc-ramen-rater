// write your code here
const API = "http://localhost:3000/ramens";
const queSel = (i) => document.querySelector(i);
const getClass = (i) => document.getElementsByClassName(i);
const getId = (i) => document.getElementById(i);
const getName = (i) => document.getElementsByName(i);

const ramenMenu = queSel('#ramen-menu');

getId('new-ramen').addEventListener('submit', addNewRamen);

fetch(API)
    .then((response) => response.json())
    // .then ((ramen) => console.log(ramen))
    // .then(ramen => ramenPics(ramen))
    .then(getRamenPics)
//END OF FETCH




function getRamenPics(ramen) {
    // console.log(ramenMenu)
    ramen.forEach(renderRamen);
}

function renderRamen (ramen) {
    const ramenMenu = getId('ramen-menu');
    // console.log(ramenMenu)
    const ramenImg = document.createElement('img');
    ramenImg.src = ramen.image;
    ramenImg.id = ramen.id;
    ramenMenu.appendChild(ramenImg);
    ramenImg.addEventListener('click', e => ramenDetail(ramen));
}

function ramenDetail (ramen) {
    // console.log(ramen.image);
    const detailImage = queSel('.detail-image');
    const ramenName = queSel('.name');
    const restaurantName = queSel('.restaurant');
    const ratingDisplay = getId('rating-display');
    const commentDisplay = getId('comment-display');
    detailImage.src = ramen.image;
    // console.log(detailImage.src)
    ramenName.innerText = ramen.name;
    restaurantName.innerText = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;

}

function addNewRamen (e) {
    e.preventDefault();
    // console.log(e.target);
    const newRamenData = {
        "name": e.target.name.value,
        "restaurant": e.target.restaurant.value,
        "image": e.target.image.value,
        "rating": e.target.rating.value,
        "comment": e.target['new-comment'].value
    };
    // console.log (newRamen);
    renderRamen(newRamenData);

    const postRamen = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body:JSON.stringify(newRamenData),
    };

    fetch("http://localhost:3000/ramens", postRamen)
        .then ((response) => response.json())
        .then ((ramen) => console.log(ramen))
        .then (() => getId('new-ramen').reset())
        .catch(function (error) {
            alert("Uh Oh!");
            console.log(error.message);
        });
}

function deleteRamen (id) {
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application.json'
        }
    })
        .then((response) => response.json())
        .then(ramen => console.log(ramen))

}





