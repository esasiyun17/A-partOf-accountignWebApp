const date = document.getElementById("txtDATE");
const code = document.getElementById("txtCODE");
const desc = document.getElementById("txtDESCRIPTION");
const debit = document.getElementById("txtDEBIT");
const credit = document.getElementById("txtCREDIT");
const addButton = document.getElementById("btnAdd");
const body = document.querySelector("tbody");
const deleteButton = document.querySelector(".deleteButton");
const saveButton = document.getElementById("btnSAVE");



function saveStorage(data) {
  var a = [];

  a = JSON.parse(localStorage.getItem("list")) || [];

  a.push(data);

  localStorage.setItem("list", JSON.stringify(a));
}

function getList() {
  let list = JSON.parse(localStorage.getItem("list")) || [];

  list.forEach((data) => {
    body.innerHTML += `
    <tr >
        <td><center>${data.date}</center></td>
        <td><center>${data.code}</center></td>
        <td><center>${data.desc}</center></td>
        <td><center>${data.debit}</center></td>
        <td><center>${data.credit}</center></td>
        <td>
            <center>
                <input type="button" id=${data.listId} value="X" class="btn btn-danger btn-sm deleteButton"/>
            </center>
        </td>
    </tr>
    `;
  });
}

document.addEventListener("DOMContentLoaded", getList());

addButton.addEventListener("click", function (e) {
  let id = Math.floor(Math.random() * 1000000);
  e.preventDefault();
  body.innerHTML += `
  <tr>
        <td><center>${date.value}</center></td>
        <td><center>${code.value}</center></td>
        <td><center>${desc.value}</center></td>
        <td><center>${debit.value}</center></td>
        <td><center>${credit.value}</center></td>
        <td>
            <center>
                <input type="button" id=${id} value="X" class="btn btn-danger btn-sm deleteButton"/>
            </center>
        </td>
    </tr>
    `;
  saveStorage(
    {
      listId: id,
      date: date.value,
      code: code.value,
      desc: desc.value,
      debit: debit.value,
      credit: credit.value,
    },
  );
});

function deleteList(id){

    const lists = JSON.parse(localStorage.getItem('list'));

    console.log(lists);
    
    lists.forEach((list,index)=>{
        if(list.listId == id){
            lists.splice(index,1)
        }
    });

    localStorage.setItem('list',JSON.stringify(lists))
}

body.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("deleteButton")) {
    e.target.parentElement.parentElement.parentElement.remove();
    deleteList(e.target.id);
  }
});

saveButton.addEventListener('click',(e)=>{
  e.preventDefault();

  localStorage.clear();
  setInterval(()=>{
    body.innerHTML = '';
  },1000);
})
