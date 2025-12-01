import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import Notification from './components/Notification';
import { useState, useEffect } from 'react';

const DEFAULT_TECHNOLOGIES = [
  {
    id: 1,
    title: 'Сочный корм',
    description: 'Изучение растений на предмет разрешенности для свинок',
    status: 'completed',
    notes: ''
  },
  {
    id: 2,
    title: 'Уборка вольера',
    description: 'Освоение основных навыков, необходимых для эффективной уборки жилплощади свинки',
    status: 'completed',
    notes: ''
  },
  {
    id: 3,
    title: 'Болезни морских свинок',
    description: 'Изучение самых частых заболеваний свинок и их симптомов',
    status: 'in-progress',
    notes: ''
  },
  {
    id: 4,
    title: 'Взаимодействие с питомцем',
    description: 'Знакомство с возможными взаимодействиями, которые не будут неприятны свинке',
    status: 'not-started',
    notes: ''
  },
  {
    id: 5,
    title: 'Основы питания морских свинок',
    description: 'Изучение искусства составления сбалансированного рациона для свинки',
    status: 'not-started',
    notes: ''
  }
];

function App() {
  const [technologies, setTechnologies] = useState(() => {
    try {
      const saved = localStorage.getItem('piggyTrackerData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Merge saved data with defaults so new items in DEFAULT_TECHNOLOGIES are preserved
          const parsedMap = new Map(parsed.map(p => [p.id, p]));
          const merged = DEFAULT_TECHNOLOGIES.map(d => ({ ...d, ...(parsedMap.get(d.id) || {}) }));
          // Include any extra items present in saved data
          const defaultsIds = new Set(DEFAULT_TECHNOLOGIES.map(d => d.id));
          const extras = parsed.filter(p => !defaultsIds.has(p.id));
          return merged.concat(extras);
        }
      }
    } catch (e) {
      console.error('Ошибка при чтении localStorage при инициализации:', e);
    }
    return DEFAULT_TECHNOLOGIES;
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const [notification, setNotification] = useState({
    isVisible: false,
    message: ''
  });

  useEffect(() => {
    // Сохраняем данные в localStorage при любых изменениях
    try {
      localStorage.setItem('piggyTrackerData', JSON.stringify(technologies));
    } catch (e) {
      console.error('Ошибка сохранения в localStorage:', e);
    }

    // На случай закрытия/перезагрузки — ещё одно сохранение
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem('piggyTrackerData', JSON.stringify(technologies));
      } catch (e) {
        /* ignore */
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [technologies]);

  const toggleTechnologyStatus = (id) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => {
        if (tech.id === id) {
          const statusOrder = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statusOrder.indexOf(tech.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return { ...tech, status: statusOrder[nextIndex] };
        }
        return tech;
      })
    );
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const updateAllStatuses = (newStatus) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({
        ...tech,
        status: newStatus
      }))
    );
  };

  const selectRandomTechnology = () => {
    const notStartedTechs = technologies.filter(tech => tech.status === 'not-started');
    if (notStartedTechs.length > 0) {
      const randomTech = notStartedTechs[Math.floor(Math.random() * notStartedTechs.length)];
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
              onClick={() => toggleTechnologyStatus(tech.id)}
              onNotesChange={updateTechnologyNotes}
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