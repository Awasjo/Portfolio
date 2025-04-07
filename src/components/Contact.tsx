import { useState, FormEvent } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (submitted) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      // Using Netlify's standard endpoint for form submissions
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(Array.from(formData.entries()) as [string, string][]).toString()
      });
      
      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }
      
      console.log("Form successfully submitted");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error('Form submission error:', err);
      setError('There was a problem submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          
          {error && (
            <div className="mb-4 p-3 bg-red-600 text-white rounded">
              {error}
            </div>
          )}
          
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
