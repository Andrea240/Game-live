// Главный компонент приложения
const App = () => {
  const [section, setSection] = React.useState('home');
  // Основные параметры и данные
  const [stats, setStats] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [avatar, setAvatar] = React.useState(null);

  // Загрузка начального состояния с сервера
  React.useEffect(() => {
    fetch('/api/state')
      .then(r => r.json())
      .then(data => {
        setStats(data.stats);
        setTasks(data.tasks);
        setEvents(data.events);
        setAvatar(data.avatar);
      })
      .catch(err => console.error('Failed to load state', err));
  }, []);

  // Сохранение состояния на сервер
  React.useEffect(() => {
    if (stats === null) return;
    const state = { stats, tasks, events, avatar };
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    }).catch(err => console.error('Failed to save state', err));
  }, [stats, tasks, events, avatar]);

  // Добавить час работы: -1 энергия, +100 денег
  const addWork = () => {
    setStats(s => ({ ...s, energy: s.energy - 1, money: s.money + 100 }));
    setEvents(e => [
      `Отработан час. Энергия -1, деньги +100`,
      ...e,
    ]);
  };

  // Добавить деньги
  const addMoney = amount => {
    setStats(s => ({ ...s, money: s.money + amount }));
    setEvents(e => [`Получено ${amount} ₽`, ...e]);
  };

  // Работа с задачами
  const addTask = text => {
    if (!text) return;
    setTasks(t => [...t, { text, done: false }]);
    setEvents(e => [`Добавлена задача: ${text}`, ...e]);
  };

  const toggleTask = idx => {
    setTasks(t =>
      t.map((task, i) => (i === idx ? { ...task, done: !task.done } : task))
    );
  };

  // Выбор компонента раздела
  const renderSection = () => {
    switch (section) {
      case 'home':
        return <Home stats={stats} events={events} avatar={avatar} setAvatar={setAvatar} />;
      case 'work':
        return <Work stats={stats} addWork={addWork} />;
      case 'finance':
        return <Finance stats={stats} addMoney={addMoney} />;
      case 'tasks':
        return <Tasks tasks={tasks} addTask={addTask} toggleTask={toggleTask} />;
      case 'garden':
        return <Placeholder title="Дача" />;
      case 'homeLife':
        return <Placeholder title="Дом" />;
      case 'skills':
        return <Placeholder title="Навыки" />;
      case 'journal':
        return <Placeholder title="Журнал" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Nav current={section} onChange={setSection} />
      {renderSection()}
    </div>
  );
};
