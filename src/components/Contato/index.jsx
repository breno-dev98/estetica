import Section from "../Section";

const Contato = () => {
  return (
    <Section id={'contato'} title="Entre em Contato">
      <div className="text-center flex flex-col max-w-2xl">
        <a href="https://wa.me/5585982390117" target="blank" className="text-lg font-semibold text-secondary hover:text-primary">
          (85) 98239-0117
        </a>
        <a href="mailto:adrielleoliveiraestetica@gmail.com" className="text-lg font-semibold text-secondary hover:text-primary">
          contato@driestetica.com
        </a>
        <p className="text-lg font-semibold text-neutral">
          Rua Chico França 622, Messejana - Fortaleza/CE
        </p>
      </div>
    </Section>
  );
};

export default Contato;
