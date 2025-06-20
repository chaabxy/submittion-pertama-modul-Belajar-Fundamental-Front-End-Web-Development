class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title", "body", "date"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const body = this.getAttribute("body") || "";
    const date = this.getAttribute("date") || "";

    // Format tanggal agar lebih enak dibaca
    let formattedDate = "";
    if (date) {
      try {
        const dateObj = new Date(date);
        formattedDate = dateObj.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (e) {
        console.error("Error formatting date:", e);
        formattedDate = date;
      }
    }

    this.shadowRoot.innerHTML = `
     <style>
      :host {
        display: block;
      }

      .note-card {
        background-color: var(--color-light, #fff);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 200px;
        border-left: 5px solid var(--color-accent, #007bff);
      }

      .note-card:hover {
        transform: translateY(-3px);
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
      }

      .note-title {
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--color-dark, #333);
        margin-bottom: 0.5rem;
        word-wrap: break-word;
        max-height: 2.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .note-body {
        font-size: 1rem;
        color: var(--color-text, #555);
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      .note-footer {
        font-size: 0.9rem;
        color: var(--color-muted, #777);
        font-style: italic;
        text-align: right;
      }
    </style>

    <div class="note-card">
      <h3 class="note-title">${title}</h3>
      <p class="note-body">${body}</p>
      ${
        formattedDate
          ? `<div class="note-footer">📅 ${formattedDate}</div>`
          : ""
      }
    </div>

    `;
  }
}

customElements.define("note-item", NoteItem);
