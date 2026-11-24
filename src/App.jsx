import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CarDetail from "./pages/CarDetail";
import Bookings from "./pages/Bookings";

export default function App() {
  // Хранение списка оформленных аренд на верхнем уровне приложения
  const [bookings, setBookings] = useState([]);

  // Добавление новой аренды в массив bookings
  const handleAddBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  // Настройка меню навигации и маршрутов приложения
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="nav-container">
          <Link to="/" className="brand-link">
            AvtoIjara
          </Link>
          <nav className="nav-menu">
            <Link to="/" className="nav-link">
              Главная
            </Link>
            <Link to="/bookings" className="nav-link">
              Мои аренды ({bookings.length})
            </Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/car/:id"
          element={<CarDetail onAddBooking={handleAddBooking} />}
        />
        <Route path="/bookings" element={<Bookings bookings={bookings} />} />
      </Routes>
    </BrowserRouter>
  );
}
