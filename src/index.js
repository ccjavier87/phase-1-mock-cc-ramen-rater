// write your code here
const API = "http://localhost:3000/ramens";
const queSel = (i) => document.querySelector(i);
const gbClass = (i) => document.getElementsByClassName(i);
const gbId = (i) => document.getElementById(i);

const ramenDetail = gbId('ramen-detail');
const cDisplay = gbId('comment-display');
const ramenForm = gbId('new-ramen');
ramenForm.addEventListener('submit', addNewRamen)

fetch(API)
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .then((data) => ramenPics(data))


function ramenPics(data) {
    data.forEach(renderRamen);
}

function renderRamen (ramen) {
    const ramenMenu = gbId('ramen-menu');
        // console.log(ramen.image)
        const ramenImg = document.createElement('img');
        ramenImg.src =  ramen.image;
        ramenImg.id = ramen.id;
        // console.log(ramen)
        ramenMenu.appendChild(ramenImg);
        ramenImg.addEventListener('click', () => renderDetail(ramen))
}

function renderDetail(ramen) {
    // console.log (ramen);
    const detName = queSel('.name');
    const detImage = queSel('.detail-image')
    const detRestaurant = queSel('.restaurant');
    const detRating = queSel('#rating-display');
    const detComment = gbId('comment-display');
    detImage.src = ramen.image;
    detName.innerText = ramen.name;
    detRestaurant.innerHTML = ramen.restaurant;
    detRating.textContent = ramen.rating;
    detComment.textContent = ramen.comment;
}

function addNewRamen (form) {
    form.preventDefault();
    // console.log(form.target)
    const newRamenData = {
        "name": form.target.name.value,
        "restaurant": form.target.restaurant.value,
        "image": form.target.image.value,
        "rating": form.target.rating.value,
        "comment": form.target['new-comment'].value,
    };
    // console.log(newRamenData);
    renderRamen(newRamenData);

    const postRamen = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(newRamenData),
    };

    fetch(API, postRamen)
        .then ((response) => response.json())
        .then ((ramen) => console.log(ramen))
        .then (() => gbId('new-ramen').reset())
        .catch (function (error) {
            alert("uh oh");
            console.log(error.message)
        })

}