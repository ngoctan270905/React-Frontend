import Header from '../components/layout/Header'
import HeroSection from '../components/home/HeroSection'
import CategoriesSection from '../components/home/CategoriesSection'
import ProductsSection from '../components/home/ProductsSection'
import EditorialSection from '../components/home/EditorialSection'
import PhilosophySection from '../components/home/PhilosophySection'
import InstagramSection from '../components/home/InstagramSection'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <EditorialSection />
      <PhilosophySection />
      <InstagramSection />
      <Footer />
    </>
  )
}