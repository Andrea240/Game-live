// Главная страница с общим статусом и событиями
const Home = ({ stats, events, avatar, setAvatar }) => {
  if (!stats) return <div>Загрузка...</div>;

  const handleAvatar = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const statBar = (value, color) => (
    <div className="w-full bg-gray-200 rounded h-2">
      <div
        className={`h-2 rounded ${color}`}
        style={{ width: `${Math.min(value, 10) * 10}%` }}
      />
    </div>
  );

  return (
    <div>
      <div className="flex items-center space-x-4">
        {avatar ? (
          <img src={avatar} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">🙂</div>
        )}
        <div>
          <h2 className="text-xl font-bold">Игрок</h2>
          <div className="text-sm">Энергия: {stats.energy} | Физика: {stats.physical} | Психика: {stats.mental} | Финансы: ₽{stats.money}</div>
          <input type="file" accept="image/*" onChange={handleAvatar} className="mt-1 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
        <div>
          <div>Энергия</div>
          {statBar(stats.energy, 'bg-red-500')}
        </div>
        <div>
          <div>Физика</div>
          {statBar(stats.physical, 'bg-green-500')}
        </div>
        <div>
          <div>Психика</div>
          {statBar(stats.mental, 'bg-blue-500')}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">События</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {events.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
