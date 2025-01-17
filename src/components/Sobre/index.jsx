// Sobre.js
import Section from "../Section";
import adrielle from "../../assets/maria-adrielle.png";

const Sobre = () => {
  return (
    <Section id={"sobre"} title="Sobre Mim">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center bg-secondary rounded-full w-fit px-16 mx-auto">
          <img src={adrielle} className="w-44 mb-10" alt="Maria Adrielle" />
        </div>
        <p className="text-lg md:text-2xl px-4 text-gray-600">
          Com mais de 10 anos de experiência, nossa equipe especializada está
          comprometida em proporcionar os melhores tratamentos estéticos, usando
          tecnologia de ponta e produtos de alta qualidade.
        </p>
      </div>
    </Section>
  );
};

export default Sobre;
