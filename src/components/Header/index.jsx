import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Ícones de menu e fechar
import { FaServicestack, FaInfoCircle, FaPhoneAlt } from "react-icons/fa"; // Ícones para os links

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Verificar o tamanho da tela para definir se é mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsMenuOpen(false); // Fechar o menu ao sair do mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função para alternar o menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      {/* Menu para Desktop */}
      {!isMobile && (
        <div className="bg-secondary fixed w-full">
          <div className="container mx-auto flex justify-between items-center p-4 px-8">
            <div className="text-background font-bold text-3xl">
              <Link to={"/"}>Dri Estética</Link>
            </div>
            <div className="flex space-x-4 text-background text-md">
              <a href="#inicio" className="hover:underline">
                Inicio
              </a>
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
      )}

      {/* Menu Mobile */}
      {isMobile && (
        <>
          <div className="bg-secondary fixed w-full p-4 flex justify-between items-center">
            <div className="text-background font-bold text-3xl">
              <Link to={"/"}>Dri Estética</Link>
            </div>
            <button onClick={toggleMenu} className="text-background">
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          {/* Menu Lateral (Drawer) */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "block" : "hidden"
            }`}
            onClick={toggleMenu}
          />
          <div
            className={`fixed right-0 top-0 h-full bg-gradient-to-l from-secondary to-primary text-white shadow-lg transition-all duration-300 ease-in-out transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } w-48 z-50 px-6`}
          >
            <div className="flex flex-col items-start space-y-6 mt-20">
              {/* Título do Menu */}
              <h2 className="text-2xl font-bold mb-6 text-white">Menu</h2>

              {/* Links com ícones */}
              <div
                onClick={toggleMenu}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-lightBackground w-full"
              >
                <FaServicestack size={20} />
                <a href="#servicos" className="text-lg font-semibold">
                  Serviços
                </a>
              </div>

              <div
                onClick={toggleMenu}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-lightBackground w-full"
              >
                <FaInfoCircle size={20} />
                <a href="#sobre" className="text-lg font-semibold">
                  Sobre
                </a>
              </div>

              <div
                onClick={toggleMenu}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-lightBackground w-full"
              >
                <FaPhoneAlt size={20} />
                <a href="#contato" className="text-lg font-semibold">
                  Contato
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
