import "../components/Contact.css";
import heroImg from "../assets/about/contact-hero.png";
function Contact() {
  return (
    <div className="contact-page">

      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      ></section>

      <section className="contact-section">
        <h2>We’d Love to Hear From You</h2>
        <p className="contact-subtext">
          Questions, support requests, feedback, or partnership ideas —
          our team is always ready to help.
        </p>

        <div className="contact-grid">

          <div className="contact-card">
            <h3>📞 Call Us</h3>
            <p>1059625112 / 1596412742</p>
            <span>Available Mon–Sat, 9 AM to 7 PM</span>
          </div>

          <div className="contact-card">
            <h3>📧 Email Support</h3>
            <p>support@dododex.com</p>
            <span>We usually reply within 24 hours</span>
          </div>

          <div className="contact-card">
            <h3>📍 Office</h3>
            <p>Bangalore, India</p>
            <span>Main Operations Center</span>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;