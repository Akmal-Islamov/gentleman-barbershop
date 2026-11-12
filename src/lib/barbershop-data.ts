export const services = [
  { name: 'Мужская стрижка', price: 100000, duration: '45–60 минут', detail: 'Идеальная форма. Точные линии. Твой характер.', icon: 'hair' },
  { name: 'Стрижка бороды', price: 60000, duration: '30 минут', detail: 'Чёткие контуры и уход до последнего штриха.', icon: 'beard' },
  { name: 'Стрижка + борода', price: 140000, duration: '75–90 минут', detail: 'Полный образ. Без компромиссов.', icon: 'combo' },
  { name: 'Детская стрижка', price: 80000, duration: '30–45 минут', detail: 'Большой стиль для маленьких джентльменов.', icon: 'child' },
] as const;

export const masters = [
  { name: 'Тимур', role: 'Топ-барбер', experience: '8 лет опыта', specialty: 'Классические стрижки · Борода' },
  { name: 'Азиз', role: 'Барбер', experience: '5 лет опыта', specialty: 'Fade · Современные стрижки' },
  { name: 'Рустам', role: 'Топ-барбер', experience: '10 лет опыта', specialty: 'Мужские образы · Опасное бритьё' },
];

export const reviews = [
  { name: 'Александр К.', initials: 'АК', date: '12 октября 2026', text: 'Наконец нашёл своего барбера. Тимур понимает с полуслова — каждый раз именно то, что хотел. Атмосфера, кофе, отношение — всё на уровне.' },
  { name: 'Даврон М.', initials: 'ДМ', date: '28 сентября 2026', text: 'Место, куда хочется возвращаться. Стрижка и борода — безупречно. Никакой спешки, внимание к каждой детали. Однозначно рекомендую.' },
  { name: 'Михаил С.', initials: 'МС', date: '15 сентября 2026', text: 'Пришли с сыном, оба остались довольны. Мастера настоящие профессионалы. Стильно, спокойно и очень комфортно. Теперь только сюда.' },
];

export const navigation = [
  { label: 'Главная', id: 'home' },
  { label: 'Услуги', id: 'services' },
  { label: 'Мастера', id: 'masters' },
  { label: 'Галерея', id: 'gallery' },
  { label: 'Контакты', id: 'contacts' },
];

// No business account is supplied: WhatsApp opens recipient selection rather than an invented account.
export const bookingUrl = (service?: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(`Здравствуйте! Хочу записаться в GENTLEMAN BARBERSHOP${service ? ` на услугу «${service}»` : ''}.`)}`;
export const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);