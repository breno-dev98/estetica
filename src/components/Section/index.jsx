// Section.js
const Section = ({ title, children, backgroundColor, id }) => {
    return (
      <div id={id} className={`${backgroundColor} flex flex-col justify-center items-center py-12`} style={{height: 'calc(100vh - 64px)'}}>
        <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold text-black mb-8">{title}</h1>
        <div className="flex flex-wrap md:flex-wrap lg:flex-wrap justify-center items-center gap-6">
          {children}
        </div>
      </div>
    );
  };
  
  export default Section;
  