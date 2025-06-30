// Раздел "Финансы"
const Finance = ({ stats, addMoney }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Финансы</h2>
      <p className="mb-2">Баланс: ₽{stats.money}</p>
      <button
        className="bg-green-500 text-white px-3 py-1 rounded"
        onClick={() => addMoney(100)}
      >
        +100 ₽
      </button>
    </div>
  );
};
