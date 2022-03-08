const addCustomer = document.querySelector("#addCustomer")
const tableBody = document.querySelector("#tableBody")

const tableHead = ['name', 'accNum', 'intialBalance', 'address']


const readDataFromStorage = (storageKey) => {
    let arrData
    try {
        arrData = JSON.parse(localStorage.getItem(storageKey)) || []
        if (!Array.isArray(arrData)) throw new Error("Is not array")
    } catch (e) {
        arrData = []
    }
    return arrData
}

const writeDataToStorage = (arrData, storageKey) => {
        localStorage.setItem(storageKey, JSON.stringify(arrData))
    }
    //let data = []

let accCheck = []
let acc
const formSubmit = function(elment) {
    elment.preventDefault()

    // Primary ID by random
    culc: while (true) {
        acc = Math.floor(Math.random() * 10001);
        if (accCheck[acc] == 1) {
            continue culc;
        } else {
            accCheck[acc] = 1
        }
        break;
    }


    let item = {
        name: this.elements.name.value,
        accNum: acc,
        intialBalance: this.elements.intialBalance.value,
        address: this.elements.address.value,


    }
    const data = readDataFromStorage("data")
    data.push(item)
    console.log(data)
    writeDataToStorage(data, "data")
    this.reset()

    showAll()
}

const creatMyOwnElements = (parent, htmlElement, txt, classes) => {
    const myEle = document.createElement(htmlElement)
    parent.appendChild(myEle)
    if (txt) myEle.textContent = txt
    if (classes) myEle.className = classes
    return myEle
}

const delCustomer = (data, i) => {
    data.splice(i, 1)
    writeDataToStorage(data, "data")
    showAll()
}

const showSingle = (customer, i, data) => {
    const tr = creatMyOwnElements(tableBody, "tr", null, null)
    creatMyOwnElements(tr, "td", i + 1, null)
    tableHead.forEach(head => creatMyOwnElements(tr, "td", customer[head], null))
    const actionTD = creatMyOwnElements(tr, "td", null, null)
    const showBtn = creatMyOwnElements(actionTD, "button", "show", "btn btn-primary me-2")
    const editBtn = creatMyOwnElements(actionTD, "button", "Edit", "btn btn-warning me-2")
    const delBtn = creatMyOwnElements(actionTD, "button", "Delete", "btn btn-danger me-2")
    delBtn.addEventListener("click", () => { delCustomer(data, i) })
}

showAll = () => {
    tableBody.innerHTML = ""
    const data = readDataFromStorage("data")
    data.forEach((customer, index) => showSingle(customer, index, data))
}


if (addCustomer) {
    addCustomer.addEventListener("submit", formSubmit)
        //showAll()
}
if (tableBody) showAll()