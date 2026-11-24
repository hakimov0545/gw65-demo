import { Link } from "react-router-dom";

export default function Bookings({ bookings }) {
  // Подсчёт общей суммы всех аренд циклом for
  let totalSum = 0;
  for (let i = 0; i < bookings.length; i += 1) {
    totalSum += bookings[i].price * bookings[i].days;
  }

  // Отображение списка активных аренд и итоговой суммы
  return (
    <main className="home-page">
      <div className="home-container">
        <h1 className="home-title">Мои аренды</h1>

        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <p className="detail-desc">У вас пока нет оформленных аренд.</p>
            <Link to="/" className="back-link">
              Перейти к выбору автомобиля
            </Link>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((item) => {
              const itemTotal = item.price * item.days;
              return (
                <article key={item.id} className="booking-item">
                  <div>
                    <h2 className="car-name">{item.name}</h2>
                    <p className="car-desc">Дней: {item.days}</p>
                  </div>
                  <p className="car-price">
                    {itemTotal.toLocaleString("ru-RU")} сум
                  </p>
                </article>
              );
            })}

            <div className="bookings-summary">
              <span>Итого:</span>
              <span className="total-price">
                {totalSum.toLocaleString("ru-RU")} сум
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
