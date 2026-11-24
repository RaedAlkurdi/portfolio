import { createFileRoute, Link } from "@tanstack/react-router";
import { Dialog, DialogClose, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import { Content, Overlay, Title } from "@radix-ui/react-dialog";

import reviewEvidenceSrc from "@/assets/purchasing-ai/review-evidence.png";
const reviewEvidence = { url: reviewEvidenceSrc };
import reviewGridSrc from "@/assets/purchasing-ai/review-grid.png";
const reviewGrid = { url: reviewGridSrc };
import replyDraftSrc from "@/assets/purchasing-ai/reply-draft.png";
const replyDraft = { url: replyDraftSrc };
import homeAttentionSrc from "@/assets/purchasing-ai/home-attention.png";
const homeAttention = { url: homeAttentionSrc };
import assistantSrc from "@/assets/purchasing-ai/assistant.png";
const assistant = { url: assistantSrc };

export const Route = createFileRoute("/projects/purchasing-ai")({
  head: () => ({
    meta: [
      { title: "Purchasing AI case study | Raed Alkurdi" },
      { name: "description", content: "A desktop prototype that compares supplier order confirmations with purchase orders and keeps the buyer in control of the decision." },
      { property: "og:title", content: "Purchasing AI case study | Raed Alkurdi" },
      { property: "og:description", content: "AI extraction, deterministic checks and source evidence for reviewing supplier confirmations." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseStudy,
});

// Edit page content here.
const overview = [
  ["Role", "Product and development project"],
  ["Platform", "Windows desktop"],
  ["Stage", "Prototype"],
  ["Stack", "React, Electron, Python, FastAPI, LangGraph, OpenAI, SQLite"],
];

const steps = [
  "Import a purchase-order CSV and a supplier PDF with selectable text.",
  "Start analysis and extract structured facts from the confirmation.",
  "Match confirmation lines to purchase-order rows and find differences or missing information.",
  "Review findings next to the original PDF and the purchase-order snapshot.",
  "Correct facts, edit a supplier-reply draft and mark the review inspected.",
];

const shots = [
  { img: reviewGrid, title: "Review grid", alt: "Review grid listing supplier confirmations with status and number of findings", text: "Each confirmation gets a row with its status and number of findings. A reviewed row means a buyer recorded a review, not that the order was accepted." },
  { img: homeAttention, title: "What needs attention", alt: "Home screen summarizing two confirmations for PO 450127 and flagging a unit price difference", text: "The home screen summarizes two confirmations for the same purchase order and flags a unit price difference for the buyer to verify." },
  { img: replyDraft, title: "Reply draft and inspection", alt: "Editable supplier reply draft listing price, revision, delivery date and freight questions", text: "The app drafts a reply that the buyer edits, then saves or copies. Nothing is sent from the app, and marking a review inspected does not accept the supplier's terms." },
  { img: assistant, title: "Workspace questions", alt: "Home screen with a question box and suggested prompts about saved reviews", text: "Buyers can ask read-only questions about the workspace or a selected review, for example which confirmations lack a delivery date." },
];

const flow = [
  "PO CSV + supplier PDF",
  "Local validation, originals preserved",
  "AI extraction of confirmation facts",
  "Deterministic matching and reconciliation",
  "Findings, source evidence, reply draft",
  "Buyer verification and inspection",
];

const decisions = [
  ["Buyer control", "The app prepares information and drafts. It does not send supplier emails, change purchase orders or make commercial commitments."],
  ["Original documents", "Source files stay in the local workspace so every finding can be checked."],
  ["Visible uncertainty", "Missing or ambiguous information is shown separately from confirmed discrepancies."],
  ["Focused scope", "One purchase-order CSV and one supplier PDF per review. Batch processing and ERP integration can come later."],
];

const nextSteps = [
  "Validate the workflow with purchasing professionals.",
  "Evaluate on authorized documents with buyer-reviewed ground truth.",
  "Measure review time, extraction and discrepancy errors, corrections, evidence quality and cost per review.",
  "Find out which integrations and supplier formats buyers actually need.",
];

const limits = [
  "Single-user Windows desktop prototype.",
  "No OCR for scanned PDFs.",
  "No live ERP connection, automatic supplier email or batch processing.",
  "A buyer still has to verify the findings.",
];

function Frame({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card ">
      <div className="flex h-8 items-center gap-1.5 border-b border-border px-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" aria-label={`Enlarge: ${alt}`} className="block w-full cursor-zoom-in focus-visible:outline-offset-[-3px]">
            <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} className="block h-auto w-full" />
          </button>
        </DialogTrigger>
        <DialogPortal>
          <Overlay className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm" />
          <Content
            aria-describedby={undefined}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto w-fit max-w-[calc(100%-2rem)] -translate-y-1/2"
          >
            <Title className="sr-only">Enlarged screenshot</Title>
            <div className="mb-3 flex justify-end">
              <DialogClose className="btn-outline">Close</DialogClose>
            </div>
            <img src={src} alt={alt} className="max-h-[calc(100dvh-6rem)] max-w-full rounded-lg border border-border object-contain" />
          </Content>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="reveal text-3xl font-bold leading-tight sm:text-4xl">{children}</h2>;
}

function CaseStudy() {
  return (
    <div className="min-h-screen text-foreground">

      <header className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-lg font-bold">RA<span className="text-primary">.</span></Link>
        <Link to="/" hash="projects" className="btn-outline !py-2 text-sm">← Back to projects</Link>
      </header>

      <main>
        <section className="container-page pt-10 pb-20">
          <p className="font-mono text-sm text-primary">Product case study</p>
          <h1 className="mt-4 text-5xl font-bold leading-[0.95] sm:text-7xl">Purchasing AI</h1>
          <p className="mt-6 max-w-3xl text-xl text-foreground/90">Helping buyers review supplier confirmations with evidence and control.</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            A desktop prototype that compares supplier order confirmations with purchase orders, highlights differences and missing information, and helps buyers check the source before they respond.
          </p>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {overview.map(([k, v]) => (
              <div key={k} className="bg-background p-5">
                <dt className="font-mono text-xs text-primary">{k}</dt>
                <dd className="mt-2 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="walkthrough" className="container-page pb-20" aria-labelledby="walkthrough-title">
          <h2 id="walkthrough-title" className="text-3xl font-bold leading-tight sm:text-4xl">Walkthrough: one supplier confirmation</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            This example uses synthetic documents for purchase order 450127 and supplier SUP-01.
          </p>
          <ol className="mt-8 grid list-decimal gap-6 pl-6 marker:font-bold marker:text-primary md:grid-cols-3">
            <li className="pl-1">
              <h3 className="font-bold">Import the documents</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Start a review with the purchase order CSV and the supplier PDF, <code className="break-all">confirmation-changed.pdf</code>. Run analysis to extract the supplier's confirmation details.
              </p>
            </li>
            <li className="pl-1">
              <h3 className="font-bold">Review the flagged price</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                On line 10, Python flags a unit price change on a split delivery. The purchase order lists <strong>2.40 SEK per piece</strong> and the supplier confirms <strong>2.55 SEK per piece</strong>.
              </p>
            </li>
            <li className="pl-1">
              <h3 className="font-bold">Check the source</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Select <strong>Check the source</strong> and compare the saved supplier PDF with the purchase order snapshot before replying. This review contains buyer corrections, so the app directs the buyer back to the original PDF to verify the corrected fields.
              </p>
            </li>
          </ol>
          <figure className="mt-8">
            <Frame src={reviewEvidence.url} alt="Analysis for synthetic PO 450127 showing the unit price difference on line 10 and the Check the source button." eager />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Synthetic example shown in the prototype. Select the screenshot to enlarge it.
            </figcaption>
          </figure>
          <div className="mt-10 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <h3 className="font-bold">What I built</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                I built the desktop review flow, from importing the documents and extracting facts with AI to comparing them in Python and presenting findings for the buyer to verify.
              </p>
            </div>
            <div>
              <h3 className="font-bold">How I tested it</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                I used synthetic documents to exercise the review flow. The project includes automated tests for parts of the prototype. Review time and accuracy with customer documents have yet to be measured.
              </p>
            </div>
          </div>
        </section>

        <section className="container-page grid gap-10 py-20 lg:grid-cols-2">
          <div>
            <H2>The problem</H2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Buyers have to check that a supplier's confirmation matches the purchase order. Quantities, prices, delivery dates and extra charges can all differ.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The information is split between a structured purchase order and an unstructured PDF. An AI summary can surface details, but the buyer still has to check them against the original.
            </p>
          </div>
          <blockquote className="card-dark reveal self-center border-l-2 border-primary p-8 font-display text-2xl leading-snug">
            How can a buyer review a supplier confirmation faster while keeping access to the evidence and control over the decision?
          </blockquote>
        </section>

        <section className="container-page py-20">
          <H2>The solution</H2>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            The app combines AI-assisted extraction, deterministic comparison and buyer review.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={i} className="card-dark reveal p-5">
                <p className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">Marking a review inspected records that the buyer checked it. It does not accept the supplier's commercial changes.</p>
        </section>

        <section className="container-page py-20">
          <H2>Product experience</H2>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            These screens show the rest of the workflow, from finding reviews that need attention to drafting a supplier reply. Select any screenshot to enlarge it.
          </p>
          <div className="mt-12 space-y-20">
            {shots.map((s, i) => (
              <figure key={s.title} className={`reveal grid items-center gap-8 lg:grid-cols-[1.6fr_1fr] ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Frame src={s.img.url} alt={s.alt} />
                <figcaption>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="container-page py-20">
          <H2>How it works</H2>
          <ol className="mt-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center" aria-label="Processing flow">
            {flow.map((f, i) => (
              <li key={f} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row">
                <div className="w-full rounded-lg border border-primary/30 bg-card p-4 text-center text-sm">{f}</div>
                {i < flow.length - 1 && <span aria-hidden className="text-primary lg:-mx-1"><span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span></span>}
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <p className="leading-relaxed text-muted-foreground">
              The model interprets the supplier document. Python applies the comparison rules and money calculations, so results are reproducible and totals can be withheld when information can't be compared safely.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Each finding can carry a quote from the source to help the buyer find the evidence. A quote shows where to look; it doesn't prove the interpretation is right.
            </p>
          </div>
        </section>

        <section className="container-page py-20">
          <H2>Product and engineering decisions</H2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {decisions.map(([t, d]) => (
              <div key={t} className="card-dark reveal p-7">
                <h3 className="text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-page py-20">
          <H2>Current stage and next steps</H2>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            The repository has a working desktop flow for importing documents, running analysis, reviewing evidence, correcting facts, editing drafts and returning to saved reviews, plus synthetic test data and automated tests for parts of it. It has not been measured with customers yet, so there are no claims here about time saved, accuracy or production readiness.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="card-dark reveal p-7">
              <h3 className="text-lg font-bold">Next steps</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">{nextSteps.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="card-dark reveal p-7">
              <h3 className="text-lg font-bold">Current limitations</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">{limits.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
