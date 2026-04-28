import "../components/About.css";
import heroImg from "../assets/about/header.png";
import teamImg from "../assets/about/team.png";
import productsImg from "../assets/about/products.png";
import promiseImg from "../assets/about/promise.png";
import contactImg from "../assets/about/contact.png";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section
      className="about-hero"
      style={{ backgroundImage: `url(${heroImg})` }}
      ></section>
    

      {/* Section 1 */}
      <section className="about-card reverse">
        <div className="about-image-box">
          <img src={teamImg} alt="Who We Are" className="about-image" />
        </div>

        <div className="about-content">
          <span className="about-number">01</span>
          <h2 className="about-section-title">Who We Are</h2>
          <p className="about-text">
            We are a small team that believes shopping online should be simple,
            honest, and affordable. Started in 2023, our store was built around
            one idea: give people access to quality products without the clutter
            or the markup.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="about-card">
        <div className="about-content">
          <span className="about-number">02</span>
          <h2 className="about-section-title">What We Sell</h2>
          <p className="about-text">
            From everyday clothing and accessories to footwear and lifestyle
            products, our catalog is curated to keep things useful and
            well-priced. We update our inventory regularly so there is always
            something new to explore.
          </p>
        </div>

        <div className="about-image-box">
          <img src={productsImg} alt="What We Sell" className="about-image" />
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-card reverse">
        <div className="about-image-box">
          <img src={promiseImg} alt="Our Promise" className="about-image" />
        </div>

        <div className="about-content">
          <span className="about-number">03</span>
          <h2 className="about-section-title">Our Promise</h2>
          <p className="about-text">
            Every order is handled with care. We offer hassle-free returns,
            transparent pricing, and customer support that actually responds.
            No gimmicks, no hidden fees.
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="about-card">
        <div className="about-content">
          <span className="about-number">04</span>
          <h2 className="about-section-title">Get in Touch</h2>
          <p className="about-text">
            Have a question or concern? Reach us at{" "}
            <strong>support@yourstore.com</strong> and we’ll get back to you
            within 24 hours.
          </p>
        </div>

        <div className="about-image-box">
          <img src={contactImg} alt="Contact Us" className="about-image" />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="about-footer">
        <h2>Thanks for being part of the DODODEX family.</h2>
        <p>Great products. Honest service. Always.</p>
        <button>Shop Now</button>
      </section>

    </div>
  );
}

export default About;