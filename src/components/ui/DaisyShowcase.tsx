import React from "react";

export default function DaisyShowcase() {
  return (
    <section className="space-y-4">
      <div className="card border border-border bg-card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-foreground">daisyUI Component Demo</h2>
          <p className="text-muted-foreground">
            This block combines project theme tokens with daisyUI component classes.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary">
              Primary
            </button>
            <button type="button" className="btn btn-outline">
              Outline
            </button>
            <button type="button" className="btn btn-ghost">
              Ghost
            </button>
            <span className="badge badge-success">Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
