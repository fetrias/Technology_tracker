import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
    const getStatusColor = () => {
        switch (status) {
            case 'completed':
                return '#3f9441ff';
            case 'in-progress':
                return '#ca7a01ff';
            case 'not-started':
                return '#cb3a30ff';
            default:
                return '#9E9E9E';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'completed':
                return 'Завершено';
            case 'in-progress':
                return 'В процессе';
            case 'not-started':
                return 'Не начато';
            default:
                return 'Неизвестно';
        }
    };

    return (
        <div className="technology-card" style={{ borderLeft: `4px solid ${getStatusColor()}` }}>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className="status-badge" style={{ backgroundColor: getStatusColor() }}>
                    {getStatusText()}
                </span>
            </div>
            <p className="card-description">{description}</p>
        </div>
    );
}

export default TechnologyCard;