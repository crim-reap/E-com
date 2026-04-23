function About() {
  return (
    <div className="about-page">
      <h1>About Us</h1>

      <div className="about-card">
        <h2 className="about-section-title">Who We Are</h2>
        <p className="about-text">
          We are a small team that believes shopping online should be simple,
          honest, and affordable. Started in 2023, our store was built around
          one idea: give people access to quality products without the clutter
          or the markup.
        </p>
      </div>

      <div className="about-card">
        <h2 className="about-section-title">What We Sell</h2>
        <p className="about-text">
          From everyday clothing and accessories to footwear and lifestyle
          products, our catalog is curated to keep things useful and
          well-priced. We update our inventory regularly so there is always
          something new to explore.
        </p>
      </div>

      <div className="about-card">
        <h2 className="about-section-title">Our Promise</h2>
        <p className="about-text">
          Every order is handled with care. We offer hassle-free returns,
          transparent pricing, and customer support that actually responds.
          No gimmicks, no hidden fees.
        </p>
      </div>

      <div className="about-card">
        <h2 className="about-section-title">Get in Touch</h2>
        <p className="about-text">
          Have a question or a concern? Reach us at{" "}
          <strong>support@yourstore.com</strong> and we will get back to you
          within 24 hours.
        </p>
      </div>
    </div>
  );
}

export default About;