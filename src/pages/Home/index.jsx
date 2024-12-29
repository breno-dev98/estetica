import Contato from "../../components/Contato";
import Hero from "../../components/Hero";
import ServicesSection from "../../components/ServicesSection";
import Sobre from "../../components/Sobre";

const Home = () => {
    return ( 
        <>
            <Hero />
            <ServicesSection />
            <Sobre />
            <Contato />
        </>
     );
}
 
export default Home;