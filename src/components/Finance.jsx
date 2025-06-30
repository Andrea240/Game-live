// Раздел "Финансы"
const Finance = ({ stats, addMoney }) => {
  if (!stats) return <div>Загрузка...</div>;
  return (
    <div className="bg-white bg-opacity-70 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">💰</span>Финансы
      </h2>
      <p className="mb-2">Баланс: ₽{stats.money}</p>
      <button
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        onClick={() => addMoney(100)}
      >
        +100 ₽
      </button>
    </div>
  );
};
