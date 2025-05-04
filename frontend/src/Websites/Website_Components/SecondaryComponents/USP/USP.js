import React from 'react'
import { useState, useEffect } from 'react';
import SectionHeading from '../Reusable/Section-Heading';
import FeatureCard from '../Reusable/FeatureCard';
import { Grid, Box, Container } from "@mui/material";
import { getUspsforSite } from '../../../../Services/WebsiteServices/AllServices/UspsService';
import './USP.css';



const USP = () => {


  const [Usps, setUsps] = useState([]);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await getUspsforSite();
        if (response && response.data) {
          console.log("Usps",response.data)
          setUsps(response.data[0]);
        } else {
          setUsps([]);
        }
      } catch (err) {
        console.log("Error during fetching images:", err);
      }
    };
    fetchTexts();
  }, []);

  return (
    <>
      {Usps && (
        <>
          <SectionHeading
            heading={Usps.MainHeading}
            subheading={Usps.SubHeading}
          />

          <Box bgcolor="#fff" py={6}>
            <Container>
              <Grid container spacing={4}>
                {Usps && Usps.IconBlocks && (
                  <Box bgcolor="#fff" py={6}>
                    <Container>
                      <Grid container spacing={4}>
                        {Usps.IconBlocks.map((feature, index) => (
                          <Grid item xs={12} sm={6} md={3} key={index}>
                            <FeatureCard
                              icon={feature.icon_image}
                              title={feature.title}
                              description={feature.description}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Container>
                  </Box>
                )}

              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
}

export default USP