// Main application logic
class NotesApp {
  constructor() {
    // data from notes.js
    this.notes = [...window.notesData];

    // Check if there are additional notes in localStorage
    const storedNotesString = localStorage.getItem("additional_notes");
    if (storedNotesString) {
      try {
        const additionalNotes = JSON.parse(storedNotesString);
        this.notes = [...this.notes, ...additionalNotes];
      } catch (e) {
        console.error("Error parsing additional notes:", e);
      }
    }

    this.currentView = "welcome";
    window.addEventListener("navigate", (event) => {
      this.navigateTo(event.detail.view, event.detail.data);
    });

    window.addEventListener("popstate", (event) => {
      if (event.state) {
        this.navigateTo(event.state.view, event.state.data, false);
      }
    });

    this.initializeView();
  }

  initializeView() {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      this.navigateTo(hash, null, false);
    } else {
      this.navigateTo("welcome", null, false);
    }
  }

  navigateTo(view, data = null, updateHistory = true) {
    const appContainer = document.getElementById("app-container");
    appContainer.innerHTML = "";

    this.currentView = view;

    // Push state to history only if updateHistory is true
    if (updateHistory) {
      history.pushState({ view, data }, "", `#${view}`);
    }

    switch (view) {
      case "welcome":
        const welcomePage = document.createElement("welcome-page");
        appContainer.appendChild(welcomePage);
        break;
      case "notes":
        const noteList = document.createElement("note-list");
        noteList.setAttribute("notes", JSON.stringify(this.notes));
        appContainer.appendChild(noteList);
        break;
      case "add-note":
        const noteForm = document.createElement("note-form");
        appContainer.appendChild(noteForm);
        break;
      default:
        const defaultWelcome = document.createElement("welcome-page");
        appContainer.appendChild(defaultWelcome);
    }
  }

  addNote(note) {
    const newNote = {
      id: "notes-" + Date.now(),
      title: note.title,
      body: note.body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    // Add the new note to our notes array
    this.notes.push(newNote);

    let additionalNotes = [];
    const storedNotesString = localStorage.getItem("additional_notes");
    if (storedNotesString) {
      try {
        additionalNotes = JSON.parse(storedNotesString);
      } catch (e) {
        console.error("Error parsing additional notes:", e);
      }
    }

    // Add the new note to additional notes
    additionalNotes.push(newNote);

    // Save only the additional notes to localStorage
    localStorage.setItem("additional_notes", JSON.stringify(additionalNotes));

    // Navigate back to notes list
    this.navigateTo("notes");
  }

  getNotes() {
    return this.notes;
  }
}

// Initialize the app after all scripts are loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new NotesApp();
});
