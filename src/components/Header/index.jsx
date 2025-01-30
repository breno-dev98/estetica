import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Ícones de menu e fechar
import { FaServicestack, FaInfoCircle, FaPhoneAlt, FaHome } from "react-icons/fa"; // Ícones para os links

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detecta se é mobile baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-primary">
      {/* Menu Desktop */}
      {!isMobile && (
        <div className="container mx-auto flex justify-between items-center p-4 px-8">
          <div className="text-background font-bold text-3xl">
            <Link to={"/"}>Adrielle Oliveira</Link>
          </div>
          <div className="flex space-x-4 text-background text-md">
            <Link to={"/"}>Início</Link>
            <Link to={"/servicos"}>Serviços</Link>
            <Link to={"/sobre"}>Sobre</Link>
            <Link to={"/contato"}>Contato</Link>
          </div>
        </div>
      )}

      {/* Menu Mobile */}
      {isMobile && (
        <div>
          <div className="flex justify-between items-center p-4">
            <div className="text-background font-bold text-2xl">
              <Link to={"/"}>Adrielle Oliveira</Link>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-background"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="bg-primary">
              <div className="flex flex-col p-4 text-background">
                <Link 
                  to={"/"} 
                  className="py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  to={"/servicos"} 
                  className="py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link 
                  to={"/sobre"} 
                  className="py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre
                </Link>
                <Link 
                  to={"/contato"} 
                  className="py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contato
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
