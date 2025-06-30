// Главный компонент приложения
const App = () => {
  const [section, setSection] = React.useState('home');
  // Основные параметры
  const [stats, setStats] = React.useState({
    energy: 5,
    physical: 5,
    mental: 5,
    money: 1000,
  });
  // Список задач
  const [tasks, setTasks] = React.useState([]);
  // Лента событий
  const [events, setEvents] = React.useState([]);

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
        return <Home stats={stats} events={events} />;
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
