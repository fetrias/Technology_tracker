import './QuickActions.css';
import { useState } from 'react';
import Modal from './Modal';

function QuickActions({ technologies, onUpdateAllStatuses, onRandomSelect }) {
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportData, setExportData] = useState('');

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            totalTechnologies: technologies.length,
            completed: technologies.filter(t => t.status === 'completed').length,
            inProgress: technologies.filter(t => t.status === 'in-progress').length,
            notStarted: technologies.filter(t => t.status === 'not-started').length,
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);
        setExportData(dataStr);
        console.log('Данные для экспорта:', dataStr);
        setShowExportModal(true);
    };

    const downloadExport = () => {
        const blob = new Blob([exportData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `piggy-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

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
                <button
                    className="action-btn export-data"
                    onClick={handleExport}
                >
                    Экспорт данных
                </button>
            </div>

            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных"
            >
                <div className="export-modal-content">
                    <p>Данные успешно подготовлены для экспорта!</p>
                    <div className="export-stats">
                        <p><strong>Всего технологий:</strong> {technologies.length}</p>
                        <p><strong>Завершено:</strong> {technologies.filter(t => t.status === 'completed').length}</p>
                        <p><strong>В процессе:</strong> {technologies.filter(t => t.status === 'in-progress').length}</p>
                        <p><strong>Не начато:</strong> {technologies.filter(t => t.status === 'not-started').length}</p>
                    </div>
                    <p className="export-hint">Данные доступны в консоли разработчика (F12)</p>
                    <div className="export-actions">
                        <button className="btn-download" onClick={downloadExport}>
                            Скачать JSON
                        </button>
                        <button className="btn-close" onClick={() => setShowExportModal(false)}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default QuickActions;