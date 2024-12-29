// ServicesSection.js
import Section from "../Section";
import ServiceCard from "../ServiceCard";

const ServicesSection = () => {
  return (
    <Section id={"servicos"} title="Nossos Serviços">
      <ServiceCard
        backgroundColor={"bg-lightBackground"}
        title="Limpeza de Pele"
        description="Tratamento completo para uma pele radiante e saudável"
        price="R$ 150,00"
      />
      <ServiceCard
        backgroundColor={"bg-lightBackground"}
        title="Massagem Modeladora"
        description="Modelagem corporal e redução de medidas"
        price="R$ 180,00"
      />
      <ServiceCard
        backgroundColor={"bg-lightBackground"}
        title="Depilação a Laser"
        description="Tecnologia avançada para resultados duradouros"
        price="A partir de R$ 200,00"
      />
    </Section>
  );
};

export default ServicesSection;
