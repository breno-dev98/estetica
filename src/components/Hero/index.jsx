import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
    id="inicio"
      className="text-center flex flex-col justify-center items-center  px-4"
      style={{ height: 'calc(100vh - 55px)' }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-primary mb-4">
        Sua beleza merece o melhor cuidado
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-neutral px-2 mb-6">
        Descubra nossos tratamentos exclusivos para realçar sua beleza natural.
      </p>
      <Link to={'/agendamento'}>
        <button className="bg-secondary text-base sm:text-base md:text-md lg:text-lg xl:text-xl mx-auto text-background py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-md hover:bg-primary hover:text-lightBackground transition duration-300">
          Agende Agora
        </button>
      </Link>
    </div>
  );
};

export default Hero;
