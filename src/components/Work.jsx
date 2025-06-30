// Раздел "Работа"
const Work = ({ stats, addWork }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Работа</h2>
      <p className="mb-2">Энергия: {stats.energy}</p>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        onClick={addWork}
      >
        +1 час работы
      </button>
    </div>
  );
};
