import React from "react";

interface AboutPageProps {
  name: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ name = "Guest" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>About Page</h1>
      <p>Welcome, {name}!</p>
    </div>
  );
};

export default AboutPage;
