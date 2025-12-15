import { LitElement, html, css } from "lit";

export class ScheduleRow extends LitElement {
  static properties = {
    heading: { type: String },
    items: { type: Array },
    loading: { type: Boolean },
    error: { type: String }
  };

  constructor() {
    super();
    this.heading = "Upcoming Games";
    this.items = [];
    this.loading = true;
    this.error = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  async load() {
    try {
      this.loading = true;
      this.error = "";
      const res = await fetch("/api/schedule", { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      this.items = Array.isArray(data?.upcoming) ? data.upcoming : [];
    } catch (e) {
      this.error = e?.message || "Failed to load schedule";
      this.items = [];
    } finally {
      this.loading = false;
    }
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .band {
      border-radius: 16px;
      padding: 16px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.04);
    }

    .title {
      margin: 0 0 12px 0;
      font-size: var(--ddd-font-size-m);
      font-weight: 700;
    }

    .row {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }

    .card {
      border-radius: 14px;
      padding: 12px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(0, 0, 0, 0.2);
      min-height: 92px;
    }

    .meta {
      font-size: 12px;
      opacity: 0.9;
      margin-bottom: 6px;
    }

    .main {
      font-weight: 700;
      margin-bottom: 6px;
    }

    .sub {
      font-size: 12px;
      opacity: 0.9;
      line-height: 1.3;
    }

    .status {
      margin-top: 8px;
      font-size: 12px;
      opacity: 0.85;
    }

    @media (max-width: 900px) {
      .row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 520px) {
      .row {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <section class="band">
        <h3 class="title">${this.heading}</h3>

        ${this.loading
          ? html`<div>Loading schedule...</div>`
          : this.error
            ? html`<div>Error: ${this.error}</div>`
            : html`
                <div class="row">
                  ${this.items.map(
                    (g) => html`
                      <div class="card">
                        <div class="meta">${g.date} · ${g.time} · ${g.team}</div>
                        <div class="main">vs ${g.opponent}</div>
                        <div class="sub">${g.location}</div>
                        ${g.status ? html`<div class="status">${g.status}</div>` : html``}
                      </div>
                    `
                  )}
                </div>
              `}
      </section>
    `;
  }
}

customElements.define("schedule-row", ScheduleRow);
