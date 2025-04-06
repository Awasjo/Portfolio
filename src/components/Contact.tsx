import { useState, FormEvent } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Only prevent default if already submitted to avoid interfering with Netlify
    if (submitted) {
      e.preventDefault();
      return;
    }
    
    // Mark as submitting - Netlify will handle the actual submission
    setIsSubmitting(true);
    
    // The form will be handled by Netlify automatically
    // We just need to update our UI state
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 500); // Small timeout just for UI feedback
  };

  return (
    <section
      id="contact"
      className="bg-secondary text-white section-container shadow-lg"
    >
      <h2 className="section-heading">Reach Out to Me</h2>
      {submitted ? (
        <div className="max-w-md mx-auto text-center">
          <p className="text-xl">Thank you for your message!</p>
          <p className="mt-2">I'll get back to you as soon as possible.</p>
        </div>
      ) : (
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
        >
          {/* Honeypot field for spam prevention */}
          <p className="hidden">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>
          
          {/* Required for Netlify forms */}
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-input"
              rows={4}
              required
              disabled={isSubmitting}
            ></textarea>
          </div>
          <button
            type="submit"
            className="button-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </section>
  );
};

export default Contact;
