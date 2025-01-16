// ServiceCard.js
const ServiceCard = ({ title, description, price, border, backgroundColor, onClick }) => {
  return (
    <div onClick={onClick} className={`${backgroundColor} ${border} p-6 rounded-lg shadow-md sm:w-80 md:w-[450px] w-9/12 h-full flex flex-col justify-between text-center`}>
      <div>
        <h2 className="text-xl md:text-3xl font-bold text-primary mb-2">{title}</h2>
        <p className="text-neutral text-md md:text-lg lg:text-2xl mb-4">{description}</p>
      </div>
      <p className="text-secondary text-md md:text-lg lg:text-2xl font-bold">{price}</p>
    </div>
  );
};

export default ServiceCard;
