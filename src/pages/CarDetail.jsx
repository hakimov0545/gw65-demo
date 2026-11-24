import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CarDetail({ onAddBooking }) {
  // Параметры маршрута, навигация и состояния загрузки/количества дней
  const { id } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(1);

  // Загрузка списка автомобилей из public/cars.json
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

  // Изменение количества дней с нижним порогом 1 день
  const decreaseDays = () => {
    setDays((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseDays = () => {
    setDays((prev) => prev + 1);
  };

  // Поиск текущей машины по id из URL
  const car = cars.find((item) => String(item.id) === String(id));

  // Создание записи аренды и переход на страницу «Мои аренды»
  const handleRent = () => {
    if (!car) return;
    onAddBooking({
      id: `${car.id}-${Date.now()}`,
      name: car.name,
      price: car.price,
      days,
    });
    navigate("/bookings");
  };

  // Экран загрузки
  if (loading) {
    return (
      <div className="status-screen">
        <p className="status-text">Загрузка...</p>
      </div>
    );
  }

  // Экран ошибки запроса
  if (error) {
    return (
      <div className="status-screen">
        <p className="status-error">Ошибка: {error}</p>
      </div>
    );
  }

  // Экран, если машина не найдена
  if (!car) {
    return (
      <main className="home-page">
        <div className="home-container">
          <p className="status-error">Автомобиль не найден.</p>
          <Link to="/" className="back-link">
            ← Назад к списку
          </Link>
        </div>
      </main>
    );
  }

  // Расчёт стоимости за выбранное число дней
  const totalPrice = car.price * days;

  // Карточка машины с выбором дней и кнопкой оформления аренды
  return (
    <main className="home-page">
      <div className="home-container">
        <Link to="/" className="back-link">
          ← Назад к списку
        </Link>

        <article className="detail-card">
          <div className="detail-header">
            <h1 className="detail-title">{car.name}</h1>
            <span className="car-seats">{car.seats} мест</span>
          </div>

          <p className="detail-desc">{car.desc}</p>
          <p className="car-price">
            {car.price.toLocaleString("ru-RU")} сум/день
          </p>

          <div className="days-control">
            <span className="days-label">Количество дней:</span>
            <div className="days-buttons">
              <button
                type="button"
                onClick={decreaseDays}
                disabled={days <= 1}
                className="day-btn"
                aria-label="Уменьшить количество дней"
              >
                −
              </button>
              <span className="days-count">{days}</span>
              <button
                type="button"
                onClick={increaseDays}
                className="day-btn"
                aria-label="Увеличить количество дней"
              >
                +
              </button>
            </div>
          </div>

          <p className="total-price">
            Цена: {totalPrice.toLocaleString("ru-RU")} сум
          </p>

          <button type="button" onClick={handleRent} className="rent-btn">
            Взять в аренду
          </button>
        </article>
      </div>
    </main>
  );
}
