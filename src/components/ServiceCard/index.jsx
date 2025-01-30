// ServiceCard.js
import { HiClock } from 'react-icons/hi';

const ServiceCard = ({ title, description, price, duration, backgroundColor, onClick, border, className }) => {
  // Função para formatar o preço
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `R$ ${price.toFixed(2)}`;
    }
    // Se for string, retorna a string diretamente
    return price;
  };

  return (
    <div
      onClick={onClick}
      className={`${backgroundColor} ${border} p-6 rounded-lg shadow-md w-9/12 flex flex-col justify-between text-center ${className}`}
    >
      <div>
        <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
        <p className="text-neutral text-md mb-4">{description}</p>
        
        {/* Duração do serviço */}
        <div className="flex items-center justify-center text-neutral text-sm mb-4">
          <HiClock className="mr-1" />
          <span>{duration}</span>
        </div>
      </div>

      <p className="text-secondary text-md font-bold">
        {formatPrice(price)}
      </p>
    </div>
  );
};

export default ServiceCard;
