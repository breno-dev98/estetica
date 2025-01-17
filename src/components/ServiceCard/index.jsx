// ServiceCard.js
const ServiceCard = ({ title, description, price, backgroundColor, onClick, border, className }) => {
  return (
    <div 
      onClick={onClick}
      className={`${backgroundColor} ${border} p-6 rounded-lg shadow-md w-9/12 flex flex-col justify-between text-center ${className}`}
    >
      <div>
        <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
        <p className="text-neutral text-md mb-4">{description}</p>
      </div>
      <p className="text-secondary text-md font-bold">{price}</p>
    </div>
  );
};

export default ServiceCard;
