import { pricing } from "../../constants/pricing";
import useCurrency from "../../hooks/useCurrency";
import usePricing from "../../hooks/usePricing";
import { styles } from "../../styles";

const PricingCard = ({ item }) => {
  const { formattedPrice } = usePricing(item.priceUSD);

  return (
    <article className="rounded-2xl border border-white/10 bg-black-100 p-7">
      <h3 className="text-xl font-bold text-white">{item.title}</h3>
      <p className="mt-3 leading-7 text-secondary">{item.description}</p>
      <p className="mt-8 text-sm font-medium uppercase tracking-wider text-secondary">
        Starting From
      </p>
      <p className="mt-2 text-3xl font-black text-white">{formattedPrice}</p>
    </article>
  );
};

const CurrencySelector = () => {
  const { currency, setCurrency, supportedCurrencies } = useCurrency();

  return (
    <label className="mt-8 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-black-100 px-4 py-3 text-sm text-white">
      <span aria-hidden="true">🌍</span>
      <span className="font-medium">Currency</span>
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value)}
        aria-label="Select currency"
        className="cursor-pointer bg-transparent font-semibold outline-none"
      >
        {supportedCurrencies.map((code) => (
          <option key={code} value={code} className="bg-black-100 text-white">
            {code}
          </option>
        ))}
      </select>
    </label>
  );
};

const Pricing = () => (
  <section className={`${styles.padding} mx-auto max-w-7xl`}>
    <p className={styles.sectionSubText}>Flexible engagement</p>
    <h2 className={styles.sectionHeadText}>Custom project scopes.</h2>
    <p className="mt-5 max-w-3xl leading-7 text-secondary">
      Every project is scoped around its goals, complexity, and delivery timeline.
      Share what you are building and I will recommend the most practical way to begin.
    </p>

    <CurrencySelector />

    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {pricing.map((item) => (
        <PricingCard key={item.id} item={item} />
      ))}
    </div>
  </section>
);

export default Pricing;
