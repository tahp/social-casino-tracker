import { useState } from 'react';

export default function AddCasino() {
  const [form, setForm] = useState({
    name: '',
    url: '',
    bonusTime: '',
    timeZone: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Casino added!');
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">➕ Add a Casino</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Casino Name" onChange={handleChange} className="border p-2 w-full" required />
        <input name="url" placeholder="Website URL" onChange={handleChange} className="border p-2 w-full" required />
        <input name="bonusTime" type="datetime-local" onChange={handleChange} className="border p-2 w-full" required />
        <input name="timeZone" placeholder="Time Zone (e.g. America/Los_Angeles)" onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="notes" placeholder="Notes (optional)" onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </main>
  );
}
