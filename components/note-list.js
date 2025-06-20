class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = [];
  }

  static get observedAttributes() {
    return ["notes"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "notes") {
      try {
        this.notes = JSON.parse(newValue) || [];
        this.render();
      } catch (e) {
        console.error("Error parsing notes:", e);
        this.notes = [];
      }
    }
  }

  connectedCallback() {
    // If notes aren't passed as an attribute, try to get them from the app
    if (this.notes.length === 0 && window.app) {
      this.notes = window.app.getNotes();
      console.log("Total notes loaded:", this.notes.length);
    }
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block; 
          padding: 2rem 0; 
        }
        .notes-container { 
          max-width: 1200px; 
          margin: auto; 
          padding: 0 20px; 
        }
        .notes-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          margin-top: 1rem; 
          margin-bottom: 2rem; 
          padding: 0rem 1rem;
          border-radius: var(--border-radius);
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
          background:var(--color-light);
        }

        .notes-count { 
          background: var(--color-dark); 
          color: var(--color-light);
          padding: 0.8rem 1.5rem; 
          margin-bottom: 5px;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1.1rem;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
        }

        .notes-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
          gap: 2rem; 
        }
        .empty-state { 
          text-align: center; 
          padding: 3rem; 
          background: var(--color-secondary); 
        }
        .actions { 
          margin-top: 2rem; 
          text-align: center; 
          display: flex; 
          justify-content: center; 
          gap: 1rem; 
        }

        /* Styling untuk tombol */
        button {
          background: var(--color-dark);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          margin-bottom: 0.8rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        button:hover {
          background: var(--color-text);
          transform: translateY(-2px);
          box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
        }

        button:active {
          transform: translateY(0);
          box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
        }

        h2{
          color:var(--color-dark);
          text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9);
        }

      </style>

      <div class="notes-container">
        <div class="notes-header">
          <h2>Daftar Catatan Kamu</h2>
          <div class="notes-count">Total Notes: ${this.notes.length}</div>
        </div>
        <div class="notes-grid">
          ${
            this.notes.length > 0
              ? this.notes
                  .map(
                    (note) =>
                      `<note-item 
                        title="${this.escapeHtml(note.title)}" 
                        body="${this.escapeHtml(note.body)}"
                        date="${note.createdAt}"
                      ></note-item>`
                  )
                  .join("")
              : '<div class="empty-state"><h3>Catatan Belum Di Tambahkan</h3><p>Buatlah Catatan Baru Anda!</p></div>'
          }
        </div>
        <div class="actions">
          <button id="add-note-btn">➕ Add New Note</button>
          <button id="back-btn">🏠 Back to Home</button>
        </div>
      </div>
    `;
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  addEventListeners() {
    this.shadowRoot
      .getElementById("add-note-btn")
      .addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("navigate", { detail: { view: "add-note" } })
        );
      });

    this.shadowRoot.getElementById("back-btn").addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("navigate", { detail: { view: "welcome" } })
      );
    });
  }
}

customElements.define("note-list", NoteList);
