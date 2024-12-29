// Sobre.js
import Section from '../Section';

const Sobre = () => {
  return (
    <Section id={'sobre'} title="Sobre Nós" backgroundColor="bg-lightBackground">
      <div className="text-center max-w-2xl">
        <p className="text-lg md:text-2xl text-gray-600">
          Com mais de 10 anos de experiência, nossa equipe especializada está
          comprometida em proporcionar os melhores tratamentos estéticos, usando
          tecnologia de ponta e produtos de alta qualidade.
        </p>
      </div>
    </Section>
  );
};

export default Sobre;
