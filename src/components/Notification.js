import './Notification.css';

function Notification({ message, isVisible, onClose }) {
    if (!isVisible) return null;

    return (
        <div className="notification-overlay">
            <div className="notification">
                <h3>Случайный выбор</h3>
                <p>{message}</p>
                <button onClick={onClose} className="notification-btn">
                    Понятно!
                </button>
            </div>
        </div>
    );
}

export default Notification;