const PORTFOLIO_IMAGES = [
  "portfolio1.jpg",
  "portfolio2.jpg",
  "portfolio3.jpg",
  "portfolio4.jpg",
  "portfolio5.jpg",
  "portfolio6.jpg",
  "portfolio7.jpg",
  "portfolio8.jpg",
  "portfolio9.jpg",
  "portfolio10.jpg",
];

/** The original portfolio sheets stay untouched: full width, in order, with no gaps or overlays. */
export default function Showcase() {
  return (
    <section id="sheets" className="w-full bg-void">
      <div className="mainimage w-full max-w-full overflow-hidden">
        {PORTFOLIO_IMAGES.map((src) => (
          <img
            key={src}
            src={src}
            alt="Portfolio Image"
            className="block h-auto w-full max-w-full object-cover object-center"
          />
        ))}
      </div>
    </section>
  );
}