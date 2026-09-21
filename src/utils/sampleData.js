import { getTodayDateString } from './formatters';

export const getSampleExpenses = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = today.getDate();

  const pad = (n) => String(n).padStart(2, '0');

  return [
    {
      id: 'sample-1',
      title: 'Monthly Groceries & Veggies',
      amount: 4850,
      category: 'Food',
      date: `${year}-${month}-${pad(Math.max(1, day - 1))}`,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'sample-2',
      title: 'Electricity & Internet Bill',
      amount: 3200,
      category: 'Bills',
      date: `${year}-${month}-${pad(Math.max(1, day - 2))}`,
      createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 'sample-3',
      title: 'Amazon Online Shopping',
      amount: 2499,
      category: 'Shopping',
      date: `${year}-${month}-${pad(Math.max(1, day - 3))}`,
      createdAt: new Date(Date.now() - 259200000).toISOString()
    },
    {
      id: 'sample-4',
      title: 'Uber Commute to Office',
      amount: 380,
      category: 'Transport',
      date: `${year}-${month}-${pad(day)}`,
      createdAt: new Date().toISOString()
    },
    {
      id: 'sample-5',
      title: 'Movie Tickets & Popcorn',
      amount: 850,
      category: 'Entertainment',
      date: `${year}-${month}-${pad(Math.max(1, day - 4))}`,
      createdAt: new Date(Date.now() - 345600000).toISOString()
    },
    {
      id: 'sample-6',
      title: 'Pharmacy & Health Supplements',
      amount: 1420,
      category: 'Health',
      date: `${year}-${month}-${pad(Math.max(1, day - 5))}`,
      createdAt: new Date(Date.now() - 432000000).toISOString()
    },
    {
      id: 'sample-7',
      title: 'Online React Masterclass Book',
      amount: 1999,
      category: 'Education',
      date: `${year}-${month}-${pad(Math.max(1, day - 6))}`,
      createdAt: new Date(Date.now() - 518400000).toISOString()
    },
    {
      id: 'sample-8',
      title: 'Weekend Fuel Refill',
      amount: 2200,
      category: 'Travel',
      date: `${year}-${month}-${pad(Math.max(1, day - 7))}`,
      createdAt: new Date(Date.now() - 604800000).toISOString()
    }
  ];
};

