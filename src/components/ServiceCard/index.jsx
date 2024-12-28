// ServiceCard.js
const ServiceCard = ({ title, description, price }) => {
    return (
      <div className="bg-lightBackground p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
        <p className="text-neutral mb-4">{description}</p>
        <p className="text-secondary font-bold">{price}</p>
      </div>
    );
  };
  
  export default ServiceCard;
  