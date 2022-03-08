function getApi(apiLink, retVal) {
    fetch(apiLink).then((data) => {
            data.json().then((y) => {
                    retVal(y, false)
                })
                .catch((err) => {
                    retVal(false, err.massage)
                })
        })
        .catch((err) => {
            retVal(false, err.massage)
        })


}

const creatMyOwnElements = (parent, htmlElement, txt, classes) => {
    const myEle = document.createElement(htmlElement)
    parent.appendChild(myEle)
    if (txt) myEle.textContent = txt
    if (classes) myEle.className = classes
    return myEle
}
const content = document.querySelector("#content")
    //  <!--             <div class="col-md-4">
    // <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap">
    //  <div class="card-body">
    //      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    //      <div class="d-flex justify-content-between align-items-center">
    //          <div class="btn-group">
    //              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
    //              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
    //          </div>
    //          <small class="text-muted">9 mins</small>
    //      </div>
    //  </div>
    //  -->
const imgSrc = document.querySelector("#imgSrc")

getApi("https://jsonplaceholder.typicode.com/photos?_limit=15", (value, err) => {
    if (err)
        console.log(err)
    else {
        value.forEach(element => {
            //console.log(element)
            let image = element.url
            const divOne = creatMyOwnElements(content, "div", null, "col-md-4")
            const divN = creatMyOwnElements(divOne, "div", null, "card mb-4 box-shadow")
            console.log(image)

            divN.innerHTML += '<img src=' + image + 'class="card-img-top" alt=' + element.thumbnailUrl + ' > '
            const divCard = creatMyOwnElements(divN, "div", null, "card-body")
            creatMyOwnElements(divCard, "p", element.title, "card-text")
            const divGro = creatMyOwnElements(divCard, "div", null, "d-flex justify-content-between align-items-center")
            creatMyOwnElements(divGro, "button", "View", "btn btn-sm btn-outline-secondary")
            creatMyOwnElements(divGro, "button", "Edit", "btn btn-sm btn-outline-secondary")

        });
    }
    console.log(value)
})