class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--color-dark);
          color: var(--color-light);
          padding: 1rem 0;
          box-shadow: var(--shadow);
        }
        
        .header-container {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        h1 {
          margin: 0;
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 1.5rem;
          }
        }
      </style>
      
      <div class="header-container">
        <h1>Notes App</h1>
      </div>
    `;

    // Add event listener to the title to navigate to welcome page
    this.shadowRoot.querySelector("h1").addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("navigate", {
          detail: { view: "welcome" },
        })
      );
    });
  }
}

customElements.define("app-header", AppHeader);
