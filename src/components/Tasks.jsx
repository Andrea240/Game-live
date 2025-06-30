// Раздел "Задачи"
const Tasks = ({ tasks, addTask, toggleTask }) => {
  const [text, setText] = React.useState('');

  return (
    <div className="bg-white bg-opacity-70 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">✅</span>Задачи
      </h2>
      <div className="flex mb-4">
        <input
          className="border p-1 flex-grow mr-2 rounded"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Новая задача"
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => {
            addTask(text);
            setText('');
          }}
        >
          Добавить
        </button>
      </div>
      <ul className="space-y-1">
        {tasks.map((t, idx) => (
          <li key={idx} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={t.done}
              onChange={() => toggleTask(idx)}
            />
            <span className={t.done ? 'line-through text-gray-500' : ''}>{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
