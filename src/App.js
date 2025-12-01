import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import ProgressBar from './components/ProgressBar';
import QuickActions from './components/QuickActions';
import Notification from './components/Notification';
import useTechnologies from './hooks/useTechnologies';
import { useState } from 'react';

function App() {
  const {
    technologies,
    toggleStatus,
    updateNotes,
    updateAllStatuses,
    progress,
    getRandomNotStarted
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');

  const [notification, setNotification] = useState({
    isVisible: false,
    message: ''
  });

  const selectRandomTechnology = () => {
    const randomTech = getRandomNotStarted();
    if (randomTech) {
      setNotification({
        isVisible: true,
        message: `Рекомендуем изучить: "${randomTech.title}"`
      });
    } else {
      setNotification({
        isVisible: true,
        message: 'Все технологии уже начаты или завершены!'
      });
    }
  };

  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter === 'all') return true;
    return tech.status === activeFilter;
  });

  return (
    <div className="App">
      <div className="container">
        <ProgressHeader technologies={technologies} />

        <QuickActions
          technologies={technologies}
          onUpdateAllStatuses={updateAllStatuses}
          onRandomSelect={selectRandomTechnology}
        />

        <div className="filters">
          <button
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            Все
          </button>
          <button
            className={activeFilter === 'not-started' ? 'active' : ''}
            onClick={() => setActiveFilter('not-started')}
          >
            Не начато
          </button>
          <button
            className={activeFilter === 'in-progress' ? 'active' : ''}
            onClick={() => setActiveFilter('in-progress')}
          >
            В процессе
          </button>
          <button
            className={activeFilter === 'completed' ? 'active' : ''}
            onClick={() => setActiveFilter('completed')}
          >
            Завершено
          </button>
        </div>

        <div className="technologies-list">
          <h2>Мой план изучения:</h2>
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              notes={tech.notes}
              onClick={() => toggleStatus(tech.id)}
              onNotesChange={updateNotes}
            />
          ))}
        </div>
      </div>
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification({ isVisible: false, message: '' })}
      />
    </div>
  );
}

export default App;