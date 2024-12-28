// Section.js
const Section = ({ title, children }) => {
    return (
      <div className="flex flex-col items-center py-12">
        <h1 className="text-3xl font-bold text-black mb-8">{title}</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {children}
        </div>
      </div>
    );
  };
  
  export default Section;
  