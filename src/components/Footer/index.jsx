const Footer = () => {
    return ( 
        <footer className="mt-4 w-full bottom-0">
            <div className="bg-primary">
          <div className="container mx-auto flex justify-center items-center p-4 px-8">
            <div className="text-background font-bold text-center  lg:text-xl md:text-lg sm:text-md text-sm">{new Date().getFullYear()} Dri Estética. <br />Todos os direitos reservados.</div>
          </div>
        </div>
        </footer>
     );
}
 
export default Footer;