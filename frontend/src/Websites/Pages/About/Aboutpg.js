import React from 'react';
import './Aboutpg.css';
import { Grid, Box, Container } from "@mui/material";
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer';
import ImageWithText from '../../Website_Components/ProductPageComponents/ImageWithText';
import FeatureCard from '../../Website_Components/SecondaryComponents/Reusable/FeatureCard';
import SectionHeading from '../../Website_Components/SecondaryComponents/Reusable/Section-Heading';

const About = () => {
  const features = [
    {
      icon: "https://image.hm.com/assets/hm/8f/8f/8f8f98dd02590c041a72c9491a9de4b0ace7b91c.jpg?imwidth=1260",
      title: "John",
    },
    {
      icon: "https://image.hm.com/assets/hm/aa/87/aa871b43e05bfd6e2319ee6ee608213546af29cd.jpg?imwidth=1260",
      title: "Jacob",
    },
    {
      icon: "https://image.hm.com/assets/hm/4e/a8/4ea86d8a0dd9fef02f062311e7541e09e7e4a9bb.jpg?imwidth=1260",
      title: "Fabian",
    },
    {
      icon: "https://image.hm.com/assets/hm/31/de/31defaed2b8f0edd51afddefabc44771755d4760.jpg?imwidth=1260",
      title: "Travish",
    },
  ];

  return (
    <>
  <div className='main-about-page-wrapper'>
    <div className='main-about-page-Heading-wrapper'>
      {/* <h2>About</h2> */}
    </div>
    <ImageWithText
  topHeading="We are the Next Generation of Clothing"
  topParagraph="H&M hoodies have advanced features that make it easy to stay comfortable, look stylish, and keep you cozy in any season."
  sectionHeading={`Effortless Style and\nExtraordinary Comfort for Every Moment.`}
  sectionText="Capture the extraordinary with every step you take. Whether you're out exploring or just enjoying the moment, this hoodie represents effortless style and comfort. Crafted with a focus on quality, it brings a touch of creativity to your everyday look. Just like the perfect shot, it fits seamlessly into your life, offering a cozy and versatile piece that’s as effortless as your favorite photo edit."
  imageUrl="https://image.hm.com/assets/hm/41/26/41260bf60a3bf19a79b7f50cf5ba116415ee49f0.jpg?imwidth=1260"
  showRefreshButton={true}
  bottomHeading="Make magic happen with H&M."
  bottomParagraph="H&M hoodies have advanced features that make it easy to stay comfortable, look stylish, and keep you cozy in any season."
/>
<div className='main-meet-team-head'>
 <SectionHeading heading="Meet the Team"/>
 </div>    
    <Box bgcolor="#fff" py={6}>
      <Container>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <div className='about-meet-team-mn-clss'>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                // description={feature.description}
              />
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    </div>
   <Footer/>
    </>
  )
}

export default About