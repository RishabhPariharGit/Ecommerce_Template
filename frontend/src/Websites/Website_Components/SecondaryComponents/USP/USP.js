import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery, Grid, Box, Container } from "@mui/material";
import Slider from "react-slick";
import SectionHeading from '../Reusable/Section-Heading';
import FeatureCard from '../Reusable/FeatureCard';
import { getUspsforSite } from '../../../../Services/WebsiteServices/AllServices/UspsService';
import './USP.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const USP = () => {
  const [Usps, setUsps] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await getUspsforSite();
        if (response && response.data) {
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

  const mobileSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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
              {isMobile ? (
                <Slider {...mobileSliderSettings}>
                  {Usps?.IconBlocks?.map((feature, index) => (
                    <Box key={index} px={2}>
                      <FeatureCard
                        icon={feature.icon_image}
                        title={feature.title}
                        description={feature.description}
                      />
                    </Box>
                  ))}
                </Slider>
              ) : (
                <Grid container spacing={4}>
                  {Usps?.IconBlocks?.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <FeatureCard
                        icon={feature.icon_image}
                        title={feature.title}
                        description={feature.description}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default USP;
