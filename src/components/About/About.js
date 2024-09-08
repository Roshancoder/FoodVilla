import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About Food Villa</h1>
            <div className="about-content">
                <section className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        At Food Villa, our mission is to deliver delicious and healthy meals right to your doorstep with unparalleled convenience and exceptional customer service.
                    </p>
                </section>
                <section className="vision">
                    <h2>Our Vision</h2>
                    <p>
                        We aim to be the leading food delivery service, connecting people with their favorite meals anytime, anywhere, while fostering a community that values quality and sustainability.
                    </p>
                </section>
                <section className="story">
                    <h2>Our Story</h2>
                    <p>
                        Founded in 2023, Food Villa started with a simple idea: to make high-quality meals accessible to everyone. From our humble beginnings, we've grown into a trusted name in food delivery, thanks to our dedicated team and loyal customers.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default About;
