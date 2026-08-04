import { styles } from "../../styles";

const Section = ({ as: Tag = "section", children, className = "", id }) => (
  <Tag id={id} className={`${styles.padding} mx-auto max-w-7xl ${className}`}>
    {children}
  </Tag>
);

export default Section;
