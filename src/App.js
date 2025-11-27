import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import { useState } from 'react';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'Сочный корм',
      description: 'Изучение растений на предмет разрешенности для свинок',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Уборка вольера',
      description: 'Освоение основных навыков, необходимых для эффективной уборки жилплощади свинки',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Болезни морских свинок',
      description: 'Изучение самых частых заболеваний свинок и их симптомов',
      status: 'in-progress'
    },
    {
      id: 4,
      title: 'Взаимодействие с питомцем',
      description: 'Знакомство с возможными взаимодействиями, которые не будут неприятны свинке',
      status: 'not-started'
    },
    {
      id: 5,
      title: 'Основы питания морских свинок',
      description: 'Изучение искусства составления сбалансированного рациона для свинки',
      status: 'not-started'
    }
  ]);

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

  return (
    <div className="App">
      <div className="container">
        <ProgressHeader technologies={technologies} />

        <div className="technologies-list">
          <h2>Мой план изучения:</h2>
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onClick={() => toggleTechnologyStatus(tech.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;