import React from 'react';
import { StoryTimeline } from '../components/StoryTimeline';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';

const OurStoryPage = () => {
  return (
    <>
      <Head>
        <title>Our Story - 40 Years of Love</title>
        <meta name="description" content="Journey through our 40 years of love, laughter, and beautiful memories together." />
      </Head>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <div className="pt-16">
          <StoryTimeline />
        </div>
      </div>
    </>
  );
};

export default OurStoryPage; 