const Contact = () => {
  return (
    <>
      <section
        id="contact"
        className="bg-green-900 dark:bg-yellow-950  text-white p-8 shadow-lg rounded-b-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Reach Out to Me</h2>
        <form
          action={`mailto:awasjomail@gmail.com`}
          method="POST"
          encType="text/plain"
          className="max-w-md mx-auto"
        >
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded-l"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Message</label>
            <textarea
              name="message"
              className="w-full border p-2 rounded-l"
            ></textarea>
          </div>
          <button
            type="submit"
            className="button-primary"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;
