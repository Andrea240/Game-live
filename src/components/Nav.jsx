// Навигационное меню
const Nav = ({ current, onChange }) => {
  const sections = [
    { id: 'home', label: '🏠 Главная' },
    { id: 'work', label: '🛠 Работа' },
    { id: 'garden', label: '🌻 Дача' },
    { id: 'homeLife', label: '🏡 Дом' },
    { id: 'finance', label: '💰 Финансы' },
    { id: 'tasks', label: '✅ Задачи' },
    { id: 'skills', label: '📚 Навыки' },
    { id: 'journal', label: '📖 Журнал' },
  ];
  return (
    <nav className="flex flex-wrap justify-center gap-2 my-4">
      {sections.map(sec => (
        <button
          key={sec.id}
          onClick={() => onChange(sec.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-colors ${
            current === sec.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-blue-100'
          }`}
        >
          {sec.label}
        </button>
      ))}
    </nav>
  );
};
