import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Fullpizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
        try {
            const { data } = await axios.get(`https://64494ce6e7eb3378ca458a5d.mockapi.io/items/${id}`);
            setPizza(data);
        } catch (error) {
            alert('Ошибка при получении!');
            navigate('/');
        }
    }
    fetchPizza();
    // eslint-disable-next-line
  }, []);

  if (!pizza) {
    return <p>Идет загрузка...</p>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h1>{pizza.title}</h1>
      <p>{pizza.price} руб.</p>
    </div>
  );
};

export default Fullpizza;
