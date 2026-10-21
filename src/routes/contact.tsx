import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { EditorialImage } from "@/components/site/EditorialImage";
import { SectionLabel } from "@/components/site/Editorial";
import { images } from "@/lib/images";
import { riseDelay } from "@/lib/motion";
import { SplitWords } from "@/components/site/SplitWords";
import { pageTitle } from "@/lib/site";

const title = pageTitle("Contact");
const description =
  "Have a question about property, home security, energy saving or sustainable housing? Start a conversation.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="bg-limestone">
      <div className="grid min-h-[100svh] lg:grid-cols-12">
        {/* Image column */}
        <div className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-forest text-on-dark lg:col-span-5 lg:min-h-0">
          <EditorialImage
            image={images.retrofit}
            className="absolute inset-0 -z-20"
            sizes="(min-width: 1024px) 42vw, 100vw"
            priority
          />
          <div className="absolute inset-0 -z-10 scrim-bottom" />
          <div className="w-full px-[clamp(1.25rem,4vw,4rem)] pb-12 pt-36 lg:pb-16">
            <div className="mb-8 flex items-center gap-4 rise-in" style={riseDelay(100)}>
              <span className="h-px w-10 bg-copper" />
              <span className="eyebrow text-on-dark-muted">Contact</span>
            </div>
            <h1 className="display-1 max-w-[10ch] text-luminous lg:text-[clamp(2.75rem,4.6vw,5rem)]">
              <SplitWords text="Start a" delay={200} step={80} />{" "}
              <em>
                <SplitWords text="conversation." delay={360} />
              </em>
            </h1>
            <p className="lede mt-6 max-w-md text-on-dark-muted rise-in" style={riseDelay(360)}>
              Have a question about property, home security, energy saving or sustainable housing?
              Get in touch.
            </p>
          </div>
        </div>

        {/* Form column */}
        <div className="px-[clamp(1.25rem,4vw,4rem)] py-16 lg:col-span-7 lg:flex lg:items-center lg:py-40">
          <div className="w-full max-w-2xl lg:mx-auto">
            <SectionLabel>Send an enquiry</SectionLabel>
            <p className="body-copy mt-6 max-w-lg text-on-light-muted">
              Share a little about your question and the best way to reach you. Enquiries are stored
              securely and read by the site owner.
            </p>
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
