class AppFooter extends HTMLElement {
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
          text-align: center;
          box-shadow: var(--shadow);
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        p {
          margin: 0;
          font-size: 1rem;
        }
        
        @media (max-width: 768px) {
          p {
            font-size: 0.875rem;
          }
        }
      </style>
      
      <div class="footer-container">
        <p>&copy; 2025 Notes App. All rights reserved.</p>
      </div>
    `;
  }
}

customElements.define("app-footer", AppFooter);
