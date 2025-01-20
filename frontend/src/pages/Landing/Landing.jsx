import JoinUs from "./JoinUs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import HowWorkIt from "./HowWorkIt";
import SuccessStories from "./SuccessStories";
import Contact from "./Contact";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowWorkIt />
      <SuccessStories />
      <JoinUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
