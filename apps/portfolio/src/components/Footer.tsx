export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-6 bg-surface-inverse px-6 py-10 md:px-14 md:py-14">
      <p className="font-display text-[34px] font-semibold leading-[1.1] text-inverse md:text-[40px] md:leading-[44px]">
        Hiring for product, design systems or frontend?
      </p>
      <a
        href="mailto:adams.z.d@gmail.com"
        className="focus-ring inline-flex w-full items-center justify-center rounded-[var(--radius-pill)] bg-[var(--bg-canvas)] px-[22px] py-3.5 font-sans text-[15px] font-semibold text-strong md:w-auto"
      >
        adams.z.d@gmail.com
      </a>
    </footer>
  );
}
