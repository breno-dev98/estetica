const Hero = () => {
    return (
      <div className="text-center flex flex-col justify-center bg-lightBackground" style={{ height: 'calc(50vh - 64px)' }}>
        <h1 className="text-6xl md:text-7xl font-extrabold text-primary mb-4">
          Sua beleza merece o melhor cuidado
        </h1>
        <p className="text-xl text-neutral mb-6">
          Descubra nossos tratamentos exclusivos para realçar sua beleza natural.
        </p>
        <button className="bg-secondary text-xl mx-auto text-background py-4 px-8 rounded-md hover:bg-primary hover:text-lightBackground transition duration-300">
          Agende Agora
        </button>
      </div>
    );
  };
  
  export default Hero;
  