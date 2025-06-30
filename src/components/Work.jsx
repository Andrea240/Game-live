// Раздел "Работа"
const Work = ({ stats, addWork }) => {
  if (!stats) return <div>Загрузка...</div>;
  return (
    <div className="bg-white bg-opacity-70 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">🛠</span>Работа
      </h2>
      <p className="mb-2">Энергия: {stats.energy}</p>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        onClick={addWork}
      >
        +1 час работы
      </button>
    </div>
  );
};
