document.form.table.onchange = function () {
    let i= document.form.table.selectedIndex;
    switch (i){
        case 0 :
            document.getElementsByTagName('button')[0].style.display='none';
            document.getElementById('div1').innerHTML='';
            document.getElementById('div2').innerHTML='';
            break;
        case 1:
            createTable();
            break;
        case 2:
            addRow();
            break;
        case 3:
            deleteRow();
            break;
        case 4:
            deleteTable();
            break;
    }
};
function commitCreate() {
    let colNumInput = document.getElementById("number");
    let name = document.getElementById("tableName").value;
    let number = colNumInput.value;
    let attris = new Array(0);
    let cols = document.getElementsByClassName("attr");
    for (let i = 0; i < number; i++) {
        attris.push(cols[i].value);
    }
    let table = new Table(name, number, attris);
    tables.push(table);
    newTable(table);
    let option = document.createElement("option");
    option.innerText = name;
    option.selected = true;
    document.form.chooseTable.appendChild(option);
}

function commitDelete() {
    if (document.form.chooseTable.selectedIndex === 0) {
        return;
    }
    tables.splice(document.form.chooseTable.selectedIndex - 1, 1);
    document.getElementById("divTable").innerHTML = "";
    document.form.chooseTable.removeChild(document.form.chooseTable.options[document.form.chooseTable.selectedIndex]);
    document.form.chooseTable.options[0].selected = true;
}
function createTable(){
    document.getElementById('div1').style.display='inline-block';
    document.getElementById('div2').innerHTML='';
    document.getElementById('number').onchange = createItem;
    document.form.chooseTable.options[0].selected = true;
    document.getElementById("number").onchange = createItem;
    document.getElementById("button").onclick = commitCreate;
}
function createItem() {
    document.getElementById("div2").innerHTML = "";
    let number = document.getElementById('number').value;
    for(let i =0;i<number;i++){
        let input = document.createElement('input');
        input.placeholder='attribute'+(i+1);
        input.type='text';
        input.className='attr';
        document.getElementById('div2').appendChild(input);
    }
    document.getElementsByTagName('button')[0].style.display ='inline-block';
}

function addRow() {
    inputs();
    document.getElementsByTagName("button")[0].onclick = function () {
        let tableNum = document.form.chooseTable.selectedIndex - 1;
        let currentTable = tables[tableNum];
        currentTable.addRow(getInputsValues());
        newTable(currentTable);
    };
}
function newTable(table) {
    document.getElementById("divTable").innerHTML = "";
    document.getElementById("divTable").appendChild(table.table);
}

function deleteRow() {
    inputs();
    document.getElementsByTagName("button")[0].onclick = function () {
        let currentTable = tables[document.form.chooseTable.selectedIndex - 1];
        currentTable.deleteRow(getInputsValues());
        newTable(currentTable);
    };
}

function deleteTable() {
    document.getElementById("div2").innerHTML =
        "<p>WARNING: You cannot undo this action!</p>";
    document.getElementById("div1").innerHTML = "";
    document.getElementsByTagName("button")[0].onclick = commitDelete;
}



function getInputsValues() {
    let list = new Array(0);
    let inputs = document.getElementById("div2");
    for (let val of inputs.childNodes) {
        list.push(val.value);
    }
    return list;
}
function inputs() {
    if(document.form.chooseTable.selectedIndex === 0){
        document.getElementsByTagName('button')[0].style.display='none';
        document.getElementById('div1').innerHTML='';
        document.getElementById('div2').innerHTML='';
    }
    else {
        document.getElementsByTagName('button')[0].style.display='inline-block';
        document.getElementById('div1').innerHTML='';
        document.getElementById('div2').innerHTML='';
        let tableNum = document.form.chooseTable.selectedIndex - 1;
        let currentTable = tables[tableNum];
        for (let i = 0; i < currentTable.attriNumber; i++) {
            let input = document.createElement("input");
            input.placeholder = currentTable.attris[i];
            input.type = "text";
            document.getElementById("div2").appendChild(input);
        }
        document.getElementsByTagName("button")[0].style.display = "inline-block";
    }
}

class Table {
    constructor(name, attrNumber, attrs) {
        this.name = name;
        this.attriNumber = attrNumber;
        this.attris = attrs;
        this.table = document.createElement("table");
        let th = this.table.createTHead();
        let tr = document.createElement("tr");
        let newCell;
        for (let i = 0; i < this.attriNumber; i++) {
            newCell = tr.insertCell(i);
            newCell.innerText = attrs[i];
        }
        th.appendChild(tr);
        this.table.createTBody();
    }

    addRow(list) {
        let newRow = this.table.tBodies[0].insertRow(this.table.length);
        let newCell;
        for (let i = 0; i < this.attriNumber; i++) {
            newCell = newRow.insertCell(i);
            newCell.innerText = list[i];
        }
        if (this.table.tBodies[0].childNodes.length % 2 === 0) {
            newRow.className = "odd";
        }
    }

    deleteRow(list) {
        let iter = this.table.tBodies[0].childNodes[Symbol.iterator]();
        let o = iter.next();
        while (!o.done) {
            let r = o.value.childNodes;
            let sun = true;
            for (let i = 0; i < list.length; i++) {
                if (!(list[i] === (r[i]).innerText || list[i] === "")) {
                    sun = false;
                }
            }
            if (sun) {
                this.table.tBodies[0].removeChild(o.value);
                iter = this.table.tBodies[0].childNodes[Symbol.iterator]();
                o = iter.next();
            }
            else {
                o = iter.next();
            }
        }
    }
}


window.tables = new Array(0);
document.form.chooseTable.onchange = function () {
    if (document.form.chooseTable.selectedIndex === 0) {
        document.getElementById("divTable").innerHTML = "";
        return;
    }
    let table = tables[document.form.chooseTable.selectedIndex - 1];
    newTable(table);
};
