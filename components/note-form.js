class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.validationErrors = {
      title: "",
      body: "",
    };
  }

  connectedCallback() {
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
        
        .form-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 2rem;
          background-color: var(--color-light);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
        }
        
        h2 {
          text-align: center;
          color: var(--color-text);
          margin-top: 0;
          margin-bottom: 1.5rem;
          padding: 0.5rem;
          font-weight: bold;
          
          /* Hapus border kontainer */
          border: none;
        }

        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--color-text);
        }
        
        input, textarea {
          width: 95%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          font-family: inherit;
          font-size: 1rem;
        }
        
        textarea {
          min-height: 200px;
          resize: vertical;
        }
        
        .error-message {
          color: #e74c3c;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          min-height: 1.2rem;
        }
        
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }
        
        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        button[type="submit"] {
          background-color: var(--color-dark);
          color: white;
        }
        
        button[type="submit"]:hover {
          background-color: var(--color-accent);
        }
        
        button[type="button"] {
          background-color: #ddd;
          color: var(--color-text);
        }
        
        button[type="button"]:hover {
          background-color: #ccc;
        }
        
        @media (max-width: 768px) {
          .form-container {
            padding: 1.5rem;
          }
          
          .form-actions {
            flex-direction: column-reverse;
            gap: 1rem;
          }
          
          button {
            width: 100%;
          }
        }
      </style>
      
      <div class="form-container">
        <h2>Tambahkan Catatan Baru</h2>
        
        <form id="note-form">
          <div class="form-group">
            <label for="title">Judul</label>
            <input type="text" id="title" name="title" required>
            <div class="error-message" id="title-error">${this.validationErrors.title}</div>
          </div>
          
          <div class="form-group">
            <label for="body">Konten</label>
            <textarea id="body" name="body" required></textarea>
            <div class="error-message" id="body-error">${this.validationErrors.body}</div>
          </div>
          
          <div class="form-actions">
            <button type="button" id="cancel-btn">Cancel</button>
            <button type="submit">Save Note</button>
          </div>
        </form>
      </div>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.getElementById("note-form");
    const titleInput = this.shadowRoot.getElementById("title");
    const bodyInput = this.shadowRoot.getElementById("body");
    const cancelBtn = this.shadowRoot.getElementById("cancel-btn");

    // Real-time validation
    titleInput.addEventListener("input", () => {
      this.validateField("title", titleInput.value);
    });

    bodyInput.addEventListener("input", () => {
      this.validateField("body", bodyInput.value);
    });

    // Form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      // Validate all fields before submission
      this.validateField("title", title);
      this.validateField("body", body);

      // Check if there are any validation errors
      if (!this.validationErrors.title && !this.validationErrors.body) {
        // Add the note
        window.app.addNote({ title, body });
      }
    });

    // Cancel button
    cancelBtn.addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("navigate", {
          detail: { view: "notes" },
        })
      );
    });
  }

  validateField(fieldName, value) {
    let errorMessage = "";

    switch (fieldName) {
      case "title":
        if (!value) {
          errorMessage = "Judul Harus Terisi";
        } else if (value.length < 10) {
          errorMessage = "Judul Minimal 10 karakter";
        } else if (value.length > 50) {
          errorMessage = "Judul Harus Kurang dari 50 Karakter";
        }
        break;
      case "body":
        if (!value) {
          errorMessage = "Konten Harus Terisi";
        } else if (value.length < 10) {
          errorMessage = "Konten Harus Lebih dari 10 Karakter";
        }
        break;
    }

    this.validationErrors[fieldName] = errorMessage;

    // Update the error message in the DOM
    const errorElement = this.shadowRoot.getElementById(`${fieldName}-error`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }

    return !errorMessage;
  }
}

customElements.define("note-form", NoteForm);
