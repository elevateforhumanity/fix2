import { notFound } from "next/navigation";
import { programReviews, programQuestions } from "../../../../lms-data/reviews";
import { programFundingProfiles } from "../../../../lms-data/programFunding";
import { RatingStars } from "../../../../components/RatingStars";

interface Props {
  params: { programId: string };
}

export const metadata = {
  title: "Program Reviews & Q&A | Elevate for Humanity",
};

export default function ProgramReviewsPage({ params }: Props) {
  const program = programFundingProfiles.find(
    (p) => p.programId === params.programId,
  );

  if (!program) {
    return notFound();
  }

  const reviews = programReviews.filter(
    (r) => r.programId === params.programId,
  );
  const questions = programQuestions.filter(
    (q) => q.programId === params.programId,
  );

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Programs • Reviews &amp; Q&amp;A
          </p>
          <h1 className="mt-2 text-2xl font-bold">{program.label}</h1>
          <p className="mt-2 text-xs text-slate-300">
            Real voices, real questions, and real outcomes from Elevate learners.
          </p>
          {reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-200">
              <RatingStars rating={avgRating} />
              <span className="font-semibold">
                {avgRating.toFixed(1)} / 5.0
              </span>
              <span className="text-slate-500">
                ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-6 space-y-5 text-[11px]">
          <div className="grid gap-4 md:grid-cols-2">
            {/* REVIEWS */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">
                What learners are saying
              </p>
              {reviews.length === 0 ? (
                <p className="text-slate-300">
                  We&apos;re still collecting reviews for this program. Check
                  back soon or talk with an Elevate coach to hear more success
                  stories.
                </p>
              ) : (
                reviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-white">
                        {rev.reviewerName}
                      </p>
                      <RatingStars rating={rev.rating} />
                    </div>
                    <p className="mt-2 text-[11px] text-slate-300">
                      "{rev.quote}"
                    </p>
                    {rev.outcomeHighlight && (
                      <p className="mt-2 text-[10px] text-emerald-400">
                        Outcome: {rev.outcomeHighlight}
                      </p>
                    )}
                  </article>
                ))
              )}
            </div>

            {/* Q&A */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">
                Common questions about this program
              </p>
              {questions.length === 0 ? (
                <p className="text-slate-300">
                  Elevate staff can answer your questions 1-on-1. Use the chat
                  or contact form to reach out about this program.
                </p>
              ) : (
                questions.map((q) => (
                  <article
                    key={q.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                  >
                    <p className="text-[11px] font-semibold text-white">
                      Q: {q.question}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      A: {q.answer ?? "Answer coming soon from Elevate staff."}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>

          <p className="text-[10px] text-slate-400">
            Later, this page can be wired to live reviews and questions in
            Supabase so learners can submit feedback directly from their
            dashboards.
          </p>
        </div>
      </section>
    </main>
  );
}
