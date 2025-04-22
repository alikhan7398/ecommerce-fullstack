import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setMessage('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4 fw-bolder">Contact Us</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Your Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <label htmlFor="subject">Subject</label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              className="form-control"
              placeholder="Your message"
              id="message"
              style={{ height: "120px" }}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="message">Your Message</label>
          </div>

          <button type="submit" className="btn btn-dark w-100">Send Message</button>
        </form>
        {message && (
          <p className="text-center text-success mt-3">{message}</p>
        )}
      </div>
    </div>
  );
}