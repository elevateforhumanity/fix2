import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function CoursesIndex() {
  return (
    <div>
      <Helmet>
        <title>Courses | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section>
        <h1 className="section-title">Available Courses</h1>
        <p>Course catalog coming soon.</p>
      </Section>
      <Footer />
    </div>
  );
}
