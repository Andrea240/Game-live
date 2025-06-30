// Главная страница с общим статусом и событиями
const Home = ({ stats, events }) => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">Игрок</h2>
          <div className="text-sm">Энергия: {stats.energy} | Физика: {stats.physical} | Психика: {stats.mental} | Финансы: ₽{stats.money}</div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">События</h3>
        <ul className="list-disc list-inside">
          {events.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
