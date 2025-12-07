// simple news card
import { LitElement, html, css } from "https://esm.run/lit";

export class NewsCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      border-radius: 16px;
      border: 1px solid rgba(155, 177, 212, 0.4);
      padding: 12px;
      background: rgba(5, 7, 11, 0.9);
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
    }

    .meta {
      font-size: 0.8rem;
      opacity: 0.8;
    }

    h3 {
      margin: 0;
      font-size: 1rem;
    }

    p {
      margin: 0;
      font-size: 0.85rem;
      opacity: 0.9;
    }
  `;

  render() {
    return html`
      <article class="card">
        <div class="meta">Nov 26 · Association Update</div>
        <h3>Silver Chariot Winter Skills Camp Announced</h3>
        <p>
          Small ice groups to work on edges, control, and game sense for
          U10–U16 players.
        </p>
      </article>
    `;
  }
}

customElements.define("news-card", NewsCard);
