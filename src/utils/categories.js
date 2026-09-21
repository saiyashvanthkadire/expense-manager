export const CATEGORIES = [
  {
    id: 'Food',
    name: 'Food',
    emoji: '🍔',
    color: '#fb923c',
    gradient: 'linear-gradient(135deg, #f97316, #fb923c)',
    bgColor: 'rgba(249, 115, 22, 0.12)',
    borderColor: 'rgba(249, 115, 22, 0.28)'
  },
  {
    id: 'Transport',
    name: 'Transport',
    emoji: '🚗',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
    bgColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.28)'
  },
  {
    id: 'Shopping',
    name: 'Shopping',
    emoji: '🛍',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #db2777, #f472b6)',
    bgColor: 'rgba(244, 114, 182, 0.12)',
    borderColor: 'rgba(244, 114, 182, 0.28)'
  },
  {
    id: 'Bills',
    name: 'Bills',
    emoji: '💡',
    color: '#facc15',
    gradient: 'linear-gradient(135deg, #ca8a04, #facc15)',
    bgColor: 'rgba(250, 204, 21, 0.12)',
    borderColor: 'rgba(250, 204, 21, 0.28)'
  },
  {
    id: 'Entertainment',
    name: 'Entertainment',
    emoji: '🎬',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    bgColor: 'rgba(167, 139, 250, 0.12)',
    borderColor: 'rgba(167, 139, 250, 0.28)'
  },
  {
    id: 'Health',
    name: 'Health',
    emoji: '❤️',
    color: '#f87171',
    gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
    bgColor: 'rgba(248, 113, 113, 0.12)',
    borderColor: 'rgba(248, 113, 113, 0.28)'
  },
  {
    id: 'Education',
    name: 'Education',
    emoji: '📚',
    color: '#2dd4bf',
    gradient: 'linear-gradient(135deg, #0d9488, #2dd4bf)',
    bgColor: 'rgba(45, 212, 191, 0.12)',
    borderColor: 'rgba(45, 212, 191, 0.28)'
  },
  {
    id: 'Travel',
    name: 'Travel',
    emoji: '✈',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #059669, #34d399)',
    bgColor: 'rgba(52, 211, 153, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.28)'
  },
  {
    id: 'Other',
    name: 'Other',
    emoji: '📦',
    color: '#94a3b8',
    gradient: 'linear-gradient(135deg, #475569, #94a3b8)',
    bgColor: 'rgba(148, 163, 184, 0.12)',
    borderColor: 'rgba(148, 163, 184, 0.28)'
  }
];

export const getCategoryMeta = (categoryId) => {
  const found = CATEGORIES.find(
    (c) => c.id.toLowerCase() === (categoryId || '').toLowerCase()
  );
  return (
    found || {
      id: categoryId || 'Other',
      name: categoryId || 'Other',
      emoji: '📦',
      color: '#94a3b8',
      gradient: 'linear-gradient(135deg, #475569, #94a3b8)',
      bgColor: 'rgba(148, 163, 184, 0.12)',
      borderColor: 'rgba(148, 163, 184, 0.28)'
    }
  );
};
