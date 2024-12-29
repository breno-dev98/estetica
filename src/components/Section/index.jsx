// Section.js
const Section = ({ title, children, backgroundColor }) => {
    return (
      <div className={`${backgroundColor} flex flex-col  items-center py-12`}>
        <h1 className="text-3xl font-bold text-black mb-8">{title}</h1>
        <div className="flex flex-wrap md:flex-wrap lg:flex-wrap justify-center items-center gap-6">
          {children}
        </div>
      </div>
    );
  };
  
  export default Section;
  