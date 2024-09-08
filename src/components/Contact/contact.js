import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
                setError('');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('There was an issue submitting your message. Please try again later.');
        }
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <div className="contact-content">
                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p>
                        Whether you have a question about our services, need assistance with an order, or just want to share your feedback, we'd love to hear from you!
                    </p>
                    <ul>
                        <li><strong>Phone:</strong> +1 (234) 567-8901</li>
                        <li><strong>Email:</strong> support@foodvilla.com</li>
                        <li><strong>Address:</strong> 123 Food Street, Flavor Town, USA</li>
                    </ul>
                </div>
                <div className="contact-form-container">
                    {submitted ? (
                        <div className="thank-you-message">
                            <h2>Thank You!</h2>
                            <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    name="subject" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-button">Send Message</button>
                        </form>
                    )}
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default Contact;
