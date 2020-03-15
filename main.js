document.addEventListener('DOMContentLoaded', function () {
    const btnColorOne = document.querySelector('div.container-color__btn:nth-child(1)');
    const btnColorTwo = document.querySelector('div.container-color__btn:nth-child(2)');
    const btnColorThree = document.querySelector('div.container-color__btn:nth-child(3)');
    const btnArray = [...document.querySelectorAll('div.container-color__btn')];

    const removeActive = function () {
        btnArray.forEach(btn => btn.classList.remove('container-color__btn--active'))
    }

    const changeColor = function () {
        const toDoH1 = document.querySelector('body h1');
        const noteEle = [...document.querySelectorAll('ul li')];
        const notePan = [...document.querySelectorAll('ul li>div')];

        if (btnColorTwo.classList.contains('container-color__btn--active')) {
            document.querySelector('body').style.backgroundColor = 'rgb(91, 204, 217)';
            toDoH1.classList.remove('to-do-first', 'to-do-third');
            toDoH1.classList.add('to-do-second');
            noteEle.forEach(ele => {
                ele.classList.remove('notes__element-first', 'notes__element-third')
                ele.classList.add('notes__element-second')
            });
            notePan.forEach(ele => {
                ele.classList.remove('notes__panel-first', 'notes__panel-third')
                ele.classList.add('notes__panel-second')
            });
        } else if (btnColorThree.classList.contains('container-color__btn--active')) {
            document.querySelector('body').style.backgroundColor = 'rgb(6, 115, 2)';
            toDoH1.classList.remove('to-do-first', 'to-do-second');
            toDoH1.classList.add('to-do-third');
            noteEle.forEach(ele => {
                ele.classList.remove('notes__element-first', 'notes__element-second')
                ele.classList.add('notes__element-third')
            });
            notePan.forEach(ele => {
                ele.classList.remove('notes__panel-first', 'notes__panel-second')
                ele.classList.add('notes__panel-third')
            });

        } else if (btnColorOne.classList.contains('container-color__btn--active')) {
            document.querySelector('body').style.backgroundColor = 'rgb(54, 63, 69)';
            toDoH1.classList.remove('to-do-third', 'to-do-second');
            toDoH1.classList.add('to-do-first');
            noteEle.forEach(ele => {
                ele.classList.remove('notes__element-third', 'notes__element-second')
                ele.classList.add('notes__element-first')
            });
            notePan.forEach(ele => {
                ele.classList.remove('notes__panel-third', 'notes__panel-second')
                ele.classList.add('notes__panel-first')
            });
        }
    }

    btnColorOne.addEventListener('click', function () {
        removeActive()
        btnColorOne.classList.add('container-color__btn--active');
        changeColor()
    })
    btnColorTwo.addEventListener('click', function () {
        removeActive()
        btnColorTwo.classList.add('container-color__btn--active');
        changeColor()
    })
    btnColorThree.addEventListener('click', function () {
        removeActive()
        btnColorThree.classList.add('container-color__btn--active');
        changeColor()
    })
})

const start = document.querySelector('.fa-plus-square');
const input = document.querySelector('.container__input');
let counter = 0;

function inputValue() {
    if (input.value === "") {
        alert("Dodaj notatkę")
    } else {
        const value = input.value;
        return value;
    }
}

start.addEventListener('click', function () {
    let inputInfo = inputValue()
    input.value = "";
    new Note(inputInfo)
})


class Note {
    constructor(text) {
        this.text = text;
        this.createElement();
    }
    createElement() {
        if (this.text === undefined) return
        else {
            const containerUl = document.querySelector('.notes__container');
            const addNote = document.createElement('li');
            if (document.querySelector('div.container-color__btn:nth-child(1)').classList.contains('container-color__btn--active')) {
                addNote.classList.add('notes__element-first');
            } else if (document.querySelector('div.container-color__btn:nth-child(2)').classList.contains('container-color__btn--active')) {
                addNote.classList.add('notes__element-second');
            } else if (document.querySelector('div.container-color__btn:nth-child(3)').classList.contains('container-color__btn--active')) {
                addNote.classList.add('notes__element-third');
            }
            containerUl.appendChild(addNote);
            counter++
            this.addNote()
            this.createPanel()
        }
    }

    addNote() {
        const containerLi = document.querySelector(`li:nth-child(${counter})`);
        const createNote = document.createElement('span');
        createNote.classList.add('notes__text');
        createNote.setAttribute('contenteditable', false)
        containerLi.appendChild(createNote);
        createNote.textContent = this.text;
    }
    createPanel() {
        const containerLi = document.querySelector(`li:nth-child(${counter})`);
        const createPanel = document.createElement('div');
        if (document.querySelector('div.container-color__btn:nth-child(1)').classList.contains('container-color__btn--active')) {
            createPanel.classList.add('notes__panel-first');
        } else if (document.querySelector('div.container-color__btn:nth-child(2)').classList.contains('container-color__btn--active')) {
            createPanel.classList.add('notes__panel-second');
        } else if (document.querySelector('div.container-color__btn:nth-child(3)').classList.contains('container-color__btn--active')) {
            createPanel.classList.add('notes__panel-third');
        }
        containerLi.appendChild(createPanel);
        this.panelDone()
        this.panelDelete()
        this.panelEdit()

    }
    noteDone(e) {
        e.target.parentNode.parentNode.parentNode.classList.toggle("notes__element--done")
    }
    noteDelete(e) {
        e.target.parentNode.parentNode.parentNode.remove();
        counter--
    }
    noteEdit(e) {
        e.target.parentNode.parentNode.previousElementSibling.setAttribute("contenteditable", true);

    }
    panelDone() {
        const contrainerDiv = document.querySelector(`li:nth-child(${counter})>div`);
        const divDone = document.createElement('div');
        divDone.classList.add('notes__done');
        contrainerDiv.appendChild(divDone);
        const divDoneIcon = document.createElement('span');
        divDoneIcon.classList.add('fas', 'fa-check');
        divDone.appendChild(divDoneIcon);
        divDoneIcon.addEventListener('click', this.noteDone)
    }
    panelDelete() {
        const contrainerDiv = document.querySelector(`li:nth-child(${counter})>div`);
        const divDone = document.createElement('div');
        divDone.classList.add('notes__delete');
        contrainerDiv.appendChild(divDone);
        const divDoneIcon = document.createElement('span');
        divDoneIcon.classList.add('fas', 'fa-times');
        divDone.appendChild(divDoneIcon);
        divDoneIcon.addEventListener('click', this.noteDelete)
    }
    panelEdit() {
        const contrainerDiv = document.querySelector(`li:nth-child(${counter})>div`);
        const divDone = document.createElement('div');
        divDone.classList.add('notes__edit');
        contrainerDiv.appendChild(divDone);
        const divDoneIcon = document.createElement('span');
        divDoneIcon.classList.add('fas', 'fa-edit');
        divDone.appendChild(divDoneIcon);
        divDoneIcon.addEventListener('click', this.noteEdit)
    }

}