import './TechnologyNotes.css';

function TechnologyNotes({ notes, onNotesChange, techId }) {
    const handleTextareaClick = (e) => e.stopPropagation();
    return (
        <div className="notes-section">
            <h4>Мои заметки:</h4>
            <textarea
                value={notes}
                onChange={(e) => onNotesChange(techId, e.target.value)}
                onClick={handleTextareaClick}
                placeholder="Записывайте сюда важные моменты..."
                rows="3"
                className="notes-textarea"
            />
            <div className="notes-hint">
                {notes && notes.length > 0
                    ? `Заметка сохранена (${notes.length} символов)`
                    : 'Добавьте заметку'
                }
            </div>
        </div>
    );
}

export default TechnologyNotes;