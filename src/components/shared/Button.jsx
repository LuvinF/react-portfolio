const Button = ({ children, className = "", href, type = "button", ...props }) => {
  const classes = `inline-flex items-center justify-center rounded-lg bg-tertiary px-6 py-3 font-semibold text-white transition hover:bg-[#2b1d62] ${className}`;

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }

  return <button type={type} className={classes} {...props}>{children}</button>;
};

export default Button;
