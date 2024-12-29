const Hero = () => {
  return (
    <div
      className="text-center flex flex-col justify-center items-center bg-lightBackground px-4"
      style={{ height: 'calc(50vh - 64px)' }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary mb-4">
        Sua beleza merece o melhor cuidado
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-neutral px-2 mb-6">
        Descubra nossos tratamentos exclusivos para realçar sua beleza natural.
      </p>
      <button className="bg-secondary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mx-auto text-background py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-md hover:bg-primary hover:text-lightBackground transition duration-300">
        Agende Agora
      </button>
    </div>
  );
};

export default Hero;
