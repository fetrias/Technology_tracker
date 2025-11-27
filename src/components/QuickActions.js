import './QuickActions.css';

function QuickActions({ technologies, onUpdateAllStatuses, onRandomSelect }) {
    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="action-buttons">
                <button
                    className="action-btn complete-all"
                    onClick={() => onUpdateAllStatuses('completed')}
                >
                    Отметить все как выполненные
                </button>
                <button
                    className="action-btn reset-all"
                    onClick={() => onUpdateAllStatuses('not-started')}
                >
                    Сбросить все статусы
                </button>
                <button
                    className="action-btn random-next"
                    onClick={onRandomSelect}
                >
                    Случайный выбор следующей технологии
                </button>
            </div>
        </div>
    );
}

export default QuickActions;