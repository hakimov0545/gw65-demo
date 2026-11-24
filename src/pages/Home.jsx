import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Состояния списка машин, статуса загрузки и ошибки запроса
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка списка автомобилей из public/cars.json при монтировании
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/cars.json");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Экран ожидания во время загрузки данных
  if (loading) {
    return (
      <div className="status-screen">
        <p className="status-text">Загрузка...</p>
      </div>
    );
  }

  // Экран ошибки, если файл не загрузился или вернул некорректный статус
  if (error) {
    return (
      <div className="status-screen">
        <p className="status-error">Ошибка: {error}</p>
      </div>
    );
  }

  // Основной блок со списком машин; каждая карточка ведёт на /car/:id
  return (
    <main className="home-page">
      <div className="home-container">
        <h1 className="home-title">Аренда автомобилей</h1>

        <div className="cars-grid">
          {cars.map((car) => (
            <Link key={car.id} to={`/car/${car.id}`} className="car-card-link">
              <article className="car-card">
                <div>
                  <div className="car-header">
                    <h2 className="car-name">{car.name}</h2>
                    <span className="car-seats">{car.seats} мест</span>
                  </div>
                  <p className="car-desc">{car.desc}</p>
                </div>

                <p className="car-price">
                  {car.price.toLocaleString("ru-RU")} сум/день
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
