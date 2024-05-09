import React from 'react'


const AboutUsPage = () => {
  return (
    <div style={{ margin: '40px', padding: '20px', backgroundColor: '#F5F5F6', borderRadius: '8px',  }}>
    <div style={{ marginBottom: '30px', marginLeft: '15px' }}>
      <h2 style={{ fontWeight: 'bold', color: '#976B7A', fontSize: '24px', marginBottom: '10px' }}>
        About Us
      </h2>
      <p>
        CookBook is where our passion for cooking meets the digital world! We believe that cooking is not just about preparing meals; it's an art, a journey, and a shared experience that brings people together. Our cooking application is crafted with love and dedication, designed to inspire home cooks, aspiring chefs, and everyone in between.
      </p>
    </div>

    <div style={{ marginBottom: '30px', marginLeft: '15px' }}>
      <h2 style={{ fontWeight: 'bold', color: '#976B7A', fontSize: '24px', marginBottom: '10px' }}>
        Our Story
      </h2>
      <p>
        Founded in 2024, CookBook was born out of a shared love for delicious food and the desire to make cooking accessible to everyone. We understand that in today's fast-paced world, finding the time and inspiration to cook can be a challenge. That's why we set out to create a platform that simplifies the cooking experience, encourages creativity, and celebrates the joy of preparing and sharing meals.
      </p>
    </div>

    <div style={{ marginLeft: '15px' }}>
      <h2 style={{ fontWeight: 'bold', color: '#976B7A', fontSize: '24px', marginBottom: '10px'}}>
        Join Us on the Culinary Adventure
      </h2>
      <p>
        Embark on a culinary adventure with CookBook. Whether you're looking for quick and easy weeknight dinners, impressive party recipes, or exploring a new cuisine, we're here to support and inspire you every step of the way.
      </p>
    </div>
  </div>

  )
}

export default AboutUsPage;