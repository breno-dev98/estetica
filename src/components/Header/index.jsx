const Header = () => {
    return (
      <header>
        <div className="bg-purple-400">
          <div className="container mx-auto flex justify-between items-center p-4 px-8">
            <div className="text-white font-bold text-3xl">Dri Estética</div>
            <div className="flex space-x-4 text-white text-md">
              <a href="#" className="hover:underline">
                Serviços
              </a>
              <a href="#" className="hover:underline">
                Sobre
              </a>
              <a href="#" className="hover:underline">
                Contato
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  