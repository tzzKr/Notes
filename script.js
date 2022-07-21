 let titels = [];
let notes = [];
let titelsTrash = [];
let notesTrash = [];
load();
loadTrash();

function openRealInput() {
    document.getElementById('realinput').classList.remove('d-none')
    document.getElementById('realinput-bg').classList.remove('d-none')
}

function closeRealInput() {
    document.getElementById('realinput').classList.add('d-none');
    document.getElementById('realinput-bg').classList.add('d-none');

}

function addNote() {

    let titel = document.getElementById('titel');
    let note = document.getElementById('note');


    if (note.value.length == 0 && titel.value.length == 0) {
        closeRealInput();

    } else {


        titels.push(titel.value);
        notes.push(note.value);
        
        document.getElementById('titel').value = '';
        document.getElementById('note').value = '';

        render();
        save()
    }
}

let noteAsText = [];
let titelsAsText = [];
let noteAsTrash = [];
let titelsAsTrash = [];

function save() {

    let noteAsText = JSON.stringify(notes);
    localStorage.setItem('notes', noteAsText);
    let titelsAsText = JSON.stringify(titels);
    localStorage.setItem('titels', titelsAsText);

    let noteAsTrash = JSON.stringify(notesTrash);
    localStorage.setItem('notesTrash', noteAsTrash);
    let titelsAsTrash = JSON.stringify(titelsTrash);
    localStorage.setItem('titelsTrash', titelsAsTrash);


}

function load() {
    let noteAsText = localStorage.getItem('notes');
    let titelsAsText = localStorage.getItem('titels');
    

    if (noteAsText && titelsAsText) {
        notes = JSON.parse(noteAsText);
        titels = JSON.parse(titelsAsText);
    }

}

function loadTrash() {

    let noteAsTrash = localStorage.getItem('notesTrash');
    let titelsAsTrash = localStorage.getItem('titelsTrash');

    if (noteAsTrash && titelsAsTrash) {
        notesTrash = JSON.parse(noteAsTrash);
        titelsTrash = JSON.parse(titelsAsTrash);
    }
}

function deleteNote(i) {
   
    let titel = titels[i];
    let note = notes[i];

    titelsTrash.push(titel);
    notesTrash.push(note);

    notes.splice(i, 1);
    titels.splice(i, 1);

    render();
    
    save();

}

function recoverTrash(i) {

titels.push(titelsTrash[i]);
notes.push(notesTrash[i]);

titelsTrash.splice(i, 1);
notesTrash.splice(i, 1);

trashRender();
save();

}

function deleteTrash(i) {
   
   if(confirm('Willst du die Notiz endgültig löschen?')) {

    notesTrash.splice(i, 1);
    titelsTrash.splice(i, 1);

    trashRender();
    
    save();

   } 
}

function render() {

    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
        const realNote = notes[i];
        const realTitle = titels[i];

        content.innerHTML += `
        <div class="note">
        <div> <h2> ${realTitle} </h2> <br>
         ${realNote}
     </div>
         <div class="deleteNote">
             <button onclick="deleteNote(${i})" class="styledelete">x</button>
         </div>
 </div>

`
    }
}



function trashRender() {

    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < notesTrash.length; i++) {
        const trashNote = notesTrash[i];
        const trashTitle = titelsTrash[i];

        content.innerHTML += html `
        <div class="note">
        <div> <h2> ${trashTitle} </h2> <br>
         ${trashNote}
     </div>
         <div class="deleteNote">
         <button onclick="deleteTrash(${i})" class="styledelete">x</button>
         <button onclick="recoverTrash(${i})" class="styledelete">rec</button>
         </div>
 </div>

`  
    }
}

function sideTrash() {

    document.getElementById('sideNote').classList.add('sideNoteTrash');
    document.getElementById('sideNote').classList.remove('sideNote');
    document.getElementById('sideTrash').classList.add('sideNote');
    document.getElementById('sideTrash').classList.remove('sideNoteTrash');
    document.getElementById('fakeInput').classList.add('d-none');
    
}

function sideNote() {

    document.getElementById('sideNote').classList.add('sideNote');
    document.getElementById('sideNote').classList.remove('sideNoteTrash');
    document.getElementById('sideTrash').classList.remove('sideNote');
    document.getElementById('sideTrash').classList.add('sideNoteTrash');
    document.getElementById('fakeInput').classList.remove('d-none');
    

    
}