import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Private notes — One2Many" },
      {
        name: "description",
        content: "Make a private note on this screen, only if it feels safe.",
      },
    ],
  }),
  component: Notes,
});

function Notes() {
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  function saveNote() {
    const note = draft.trim();
    if (!note) return;
    setNotes((current) => [note, ...current]);
    setDraft("");
  }

  return (
    <AppShell eyebrow="Only if it feels safe" title="Private notes">
      <div className="rounded-2xl border bg-card p-4">
        <p className="text-sm font-medium">Write something for yourself</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          You do not need to include names or details. Only write here if this
          device is safe for you to use.
        </p>
        <label htmlFor="private-note" className="sr-only">
          Your note
        </label>
        <textarea
          id="private-note"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a note…"
          rows={5}
          className="mt-4 w-full resize-y rounded-xl border bg-input p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="button"
          onClick={saveNote}
          disabled={!draft.trim()}
          className="mt-3 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-45"
        >
          Keep note on this screen
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-[#e7e1ed] bg-[#f3f0f6] p-4">
        <p className="text-sm font-semibold">A note about privacy</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          This demo does not encrypt or save notes. They are cleared when you
          leave this page or close the app. Avoid recording anything that could
          put you at risk.
        </p>
      </div>

      {notes.length > 0 && (
        <section className="mt-6" aria-labelledby="notes-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="notes-heading" className="text-lg font-semibold">
              On this screen
            </h2>
            <button
              type="button"
              onClick={() => setNotes([])}
              className="text-xs font-semibold text-muted-foreground underline underline-offset-4"
            >
              Clear all
            </button>
          </div>
          <ul className="space-y-3">
            {notes.map((note, index) => (
              <li
                key={`${index}-${note}`}
                className="whitespace-pre-wrap rounded-2xl border bg-card p-4 text-sm leading-relaxed"
              >
                {note}
              </li>
            ))}
          </ul>
        </section>
      )}
    </AppShell>
  );
}
