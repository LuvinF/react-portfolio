const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex rounded-full bg-tertiary px-3 py-1 text-sm font-medium text-white ${className}`}>
    {children}
  </span>
);

export default Badge;
