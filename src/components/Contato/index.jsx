import Section from "../Section";
import insta from "../../assets/instagram.svg";
import tiktok from "../../assets/tiktok.svg";

const Contato = () => {
  return (
    <Section id={"contato"} title="Entre em Contato">
      <div className="text-center flex flex-col gap-2 max-w-2xl">
        <a
          href="https://wa.me/5585982390117"
          target="blank"
          className="md:text-3xl sm:text-2xl text-lg font-semibold text-secondary hover:text-primary"
        >
          (85) 98239-0117
        </a>
        <a
          href="mailto:adrielleoliveiraestetica@gmail.com"
          className="md:text-3xl sm:text-2xl text-lg font-semibold text-secondary hover:text-primary"
        >
          contato@driestetica.com
        </a>
        <p className="md:text-3xl sm:text-2xl text-lg font-semibold text-neutral">
        Messejana - Fortaleza/CE
        </p>
        <div className="flex flex-col mx-auto">
          <h2 className="md:text-3xl sm:text-2xl text-lg font-semibold text-black">
            Siga-me nas redes sociais
          </h2>
          <div className="social media flex gap-2 mt-2 mx-auto">
            <a
              href="https://www.instagram.com/adrielleoliveiraestetica_"
              target="_blank"
            >
              <img src={insta} className="cursor-pointer" />
            </a>
            <a href="https://www.tiktok.com/@adrielleoliveiraestetic" target="_blank">
              <img src={tiktok} className="cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contato;
