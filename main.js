const notesContainer = document.getElementById("notas");
const addNoteButton = notesContainer.querySelector(".add-note");

addNoteButton.addEventListener("click", () => addNote());

// Função para obter as notas do localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Função para salvar as notas no localStorage
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Função para criar o elemento de nota
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

// Função para adicionar uma nova nota
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

// Função para atualizar o conteúdo de uma nota
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.find((note) => note.id == id);

  targetNote.content = newContent;
  saveNotes(notes);
}

// Função para excluir uma nota
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}

// Carregar as notas existentes do localStorage ao carregar a página
window.addEventListener("load", () => {
  const notes = getNotes();
  notes.forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
  });
});