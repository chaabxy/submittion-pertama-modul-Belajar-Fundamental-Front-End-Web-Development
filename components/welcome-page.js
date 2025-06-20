class WelcomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :root {
          --color-primary: #f7e4d9; /* Latar belakang soft */
          --color-secondary: #f4ac9c; /* Warna aksen */
          --color-accent:rgb(168, 95, 106); /* Warna aksen tambahan */
          --color-dark: #5d576b; /* Warna teks utama */
          --color-text: #3c3c3c; /* Warna teks paragraf */
          --color-light: #ffffff;
          --shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          --border-radius: 12px;
        }

        :host {
          display: block;
        }

        .welcome-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, var(--color-light), #ffddd2);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-dark);
          text-shadow: 2px 2px 6px rgba(255, 255, 255, 1);
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          letter-spacing: 1px;
          transition: all 0.3s ease-in-out;
        }

        h2:hover {
          transform: scale(1.05);
          color: var(--color-accent);
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 600px;
          color: var(--color-text);
          opacity: 0.85;
          line-height: 1.6;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          transition: opacity 0.3s ease-in-out;
        }

        p:hover {
          opacity: 1;
        }

        .buttons-container {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        button {
          background: linear-gradient(135deg, var(--color-secondary), var(--color-accent));
          color: var(--color-text);
          border: none;
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.5px;
        }

        button:hover {
          background: linear-gradient(135deg, var(--color-accent), var(--color-secondary));
          transform: translateY(-3px);
          box-shadow: 0px 6px 15px rgba(209, 123, 136, 0.5);
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2rem;
          }

          p {
            font-size: 1rem;
          }

          .buttons-container {
            flex-direction: column;
            gap: 1rem;
          }
        }
      </style>

      <div class="welcome-container">
        <h2>Selamat Datang di Notes App</h2>
        <p>
          Catat dan kelola ide-ide terbaikmu dengan mudah besti.      
          Mulai dengan melihat catatan yang ada atau buat yang baru sekarang.
        </p>

        <div class="buttons-container">
          <button id="view-notes">Lihat Catatan</button>
          <button id="add-note">Buat Catatan</button>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    this.shadowRoot
      .getElementById("view-notes")
      .addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("navigate", {
            detail: { view: "notes" },
          })
        );
      });

    this.shadowRoot.getElementById("add-note").addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("navigate", {
          detail: { view: "add-note" },
        })
      );
    });
  }
}

customElements.define("welcome-page", WelcomePage);
