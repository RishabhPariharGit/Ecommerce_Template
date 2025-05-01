import React from 'react'
import SectionHeading from '../Reusable/Section-Heading';
import FeatureCard from '../Reusable/FeatureCard';
import { Grid, Box, Container } from "@mui/material";
import './USP.css';



const USP = () => {

    const features = [
        {
          icon: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/transparency.png?crop=center&height=64&v=1709367756&width=64",
          title: "Transparency",
          description: "Full disclosure of ingredients used & their concentration",
        },
        {
          icon: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/medical-research-256_1.png?v=1708782298&width=128",
          title: "Efficacy",
          description: "Formulations developed in our in-house laboratories",
        },
        {
          icon: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/download.png?crop=center&height=64&v=1709206575&width=64",
          title: "Affordable",
          description: "Skincare, accessible to all",
        },
        {
          icon: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/transparency.png?crop=center&height=64&v=1709367756&width=64",
          title: "Only the best",
          description: "Ingredients sourced from across the world",
        },
      ];
  return (
    <>
    <SectionHeading heading="The future of personal care is here" subheading="Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions."/>
    
    <Box bgcolor="#fff" py={6}>
      <Container>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    
    </>
  )
}

export default USP