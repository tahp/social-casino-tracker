import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';
import { DateTime } from 'luxon';

export const getServerSideProps: GetServerSideProps = async () => {
  const casinos = await prisma.casino.findMany();
  return { props: { casinos } };
};

export default function Home({ casinos }) {
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🎰 Casino Bonus Tracker</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Bonus Time</th>
            <th className="border px-4 py-2 text-left">Time Zone</th>
            <th className="border px-4 py-2 text-left">Countdown</th>
          </tr>
        </thead>
        <tbody>
          {casinos.map((casino) => {
            const now = DateTime.now().setZone(casino.timeZone);
            const bonusTime = DateTime.fromISO(casino.bonusTime).setZone(casino.timeZone);

            let nextBonus = bonusTime;
            if (bonusTime < now) {
              nextBonus = bonusTime.plus({ days: 1 }); // assume daily bonus
            }

            const diff = nextBonus.diff(now, ['hours', 'minutes']).toObject();
            const countdown =
              diff.hours < 0
                ? 'Ready!'
                : `${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m`;

            return (
              <tr key={casino.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <a href={casino.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {casino.name}
                  </a>
                </td>
                <td className="border px-4 py-2">{bonusTime.toFormat('hh:mm a')}</td>
                <td className="border px-4 py-2">{casino.timeZone}</td>
                <td className="border px-4 py-2 font-semibold">{countdown}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
