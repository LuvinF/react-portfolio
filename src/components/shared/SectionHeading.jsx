import { styles } from "../../styles";

const SectionHeading = ({ eyebrow, title, className = "" }) => (
  <div className={className}>
    {eyebrow && <p className={styles.sectionSubText}>{eyebrow}</p>}
    <h2 className={styles.sectionHeadText}>{title}</h2>
  </div>
);

export default SectionHeading;
