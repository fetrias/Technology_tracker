import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
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

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('piggyTrackerData', initialTechnologies);

    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const toggleStatus = (techId) => {
        setTechnologies(prev =>
            prev.map(tech => {
                if (tech.id === techId) {
                    const statusOrder = ['not-started', 'in-progress', 'completed'];
                    const currentIndex = statusOrder.indexOf(tech.status);
                    const nextIndex = (currentIndex + 1) % statusOrder.length;
                    return { ...tech, status: statusOrder[nextIndex] };
                }
                return tech;
            })
        );
    };

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const updateAllStatuses = (newStatus) => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: newStatus }))
        );
    };

    const resetAll = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    const getRandomNotStarted = () => {
        const notStarted = technologies.filter(tech => tech.status === 'not-started');
        if (notStarted.length > 0) {
            return notStarted[Math.floor(Math.random() * notStarted.length)];
        }
        return null;
    };

    return {
        technologies,
        setTechnologies,
        updateStatus,
        toggleStatus,
        updateNotes,
        updateAllStatuses,
        resetAll,
        progress: calculateProgress(),
        getRandomNotStarted
    };
}

export default useTechnologies;
