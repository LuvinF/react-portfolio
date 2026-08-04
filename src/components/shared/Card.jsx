const Card = ({ children, className = "" }) => (
  <article className={`rounded-2xl border border-white/10 bg-black-100 p-6 sm:p-8 ${className}`}>
    {children}
  </article>
);

export default Card;
