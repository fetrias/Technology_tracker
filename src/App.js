import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
  const technologies = [
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
  ];

  return (
    <div className="App">
      <div className="container">
        <ProgressHeader technologies={technologies} />

        <div className="technologies-list">
          <h2>Мой план изучения:</h2>
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;