const Header = () => {
    return (
      <header>
        <div className="bg-secondary">
          <div className="container mx-auto flex justify-between items-center p-4 px-8">
            <div className="text-background font-bold text-3xl">Dri Estética</div>
            <div className="flex space-x-4 text-background text-md">
              <a href="#servicos" className="hover:underline">
                Serviços
              </a>
              <a href="#sobre" className="hover:underline">
                Sobre
              </a>
              <a href="#contato" className="hover:underline">
                Contato
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  