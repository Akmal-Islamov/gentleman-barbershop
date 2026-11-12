import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Menu, MessageCircle, Phone, Scissors, Send, ShieldCheck, Sparkles, Star, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { bookingUrl, formatPrice, masters, navigation, reviews, services } from '@/lib/barbershop-data';
import interior from '@/assets/barbershop-interior.jpg';
import team from '@/assets/barber-team.jpg';
import haircut from '@/assets/haircut-detail.jpg';
import craft from '@/assets/barber-craft.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'GENTLEMAN BARBERSHOP — Твой стиль. Твои правила.' },
    { name: 'description', content: 'Премиальный барбершоп в Ташкенте. Мужская стрижка от 100 000 сум, уход за бородой и мастера своего дела.' },
    { property: 'og:title', content: 'GENTLEMAN BARBERSHOP — Твой стиль. Твои правила.' },
    { property: 'og:description', content: 'Точные стрижки, безупречная борода и особенная атмосфера в Ташкенте.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const gallery = [
  { image: haircut, title: 'Точность в каждой линии', category: 'СТРИЖКИ' },
  { image: interior, title: 'Твоя территория', category: 'АТМОСФЕРА' },
  { image: craft, title: 'Искусство в деталях', category: 'ПРОЦЕСС' },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#home" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="GENTLEMAN — главная"><span>GENTLEMAN<span className="brand-dot">.</span></span><small>BARBERSHOP</small></a>;
}

function Booking({ label = 'Записаться', service, outline = false }: { label?: string; service?: string; outline?: boolean }) {
  return <Button variant={outline ? 'premiumOutline' : 'premium'} asChild><a href={bookingUrl(service)} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={17} /></a></Button>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [photo, setPhoto] = useState<number | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-15% 0px -65% 0px' });
    navigation.forEach(item => { const section = document.getElementById(item.id); if (section) sectionObserver.observe(section); });
    return () => { observer.disconnect(); sectionObserver.disconnect(); };
  }, []);

  return <>
    <header className="site-header"><div className="container header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''}>{item.label}</a>)}</nav>
      <div className="header-actions"><Booking /><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
    </div>{menuOpen && <nav className="mobile-nav" aria-label="Мобильная навигация">{navigation.map(item => <a href={`#${item.id}`} key={item.id} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={18} /></a>)}</nav>}</header>

    <main>
      <section id="home" className="hero">
        <img className="hero-image" src={interior} width={1920} height={1024} alt="Премиальный интерьер GENTLEMAN с кожаным барберским креслом" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="container hero-inner">
          <div className="hero-copy"><div className="eyebrow"><span className="tiny-line" /> ТАШКЕНТ · МУЖСКАЯ ТЕРРИТОРИЯ</div>
            <h1>ТВОЙ СТИЛЬ.<br /><span>ТВОИ ПРАВИЛА.</span></h1>
            <p>Больше, чем стрижка. Место, где характер<br className="desktop-break" /> обретает форму, а детали решают всё.</p>
            <div className="hero-buttons"><Booking label="Записаться на стрижку" /><Button asChild variant="premiumOutline"><a href="#services">Наши услуги<ArrowRight /></a></Button></div>
            <div className="hero-proof"><div className="proof-stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} />)}</div><strong>4.9</strong><span className="proof-divider" /><span>Стиль начинается с доверия</span></div>
          </div>
          <div className="hero-bottom"><a href="#services" className="scroll-link"><ArrowDown size={16} /><span>ЛИСТАЙ ВНИЗ</span></a><div className="hero-signature">GENTLEMAN <span>—</span> NOT JUST A HAIRCUT.</div><span className="hero-index">01 / 05</span></div>
        </div>
      </section>

      <div className="values-band"><div className="container values-inner"><span><Scissors /> МАСТЕРСТВО В ДЕТАЛЯХ</span><span><ShieldCheck /> БЕЗУПРЕЧНЫЙ СЕРВИС</span><span><Sparkles /> ОСОБЕННАЯ АТМОСФЕРА</span><span><Check /> ТВОЙ ИНДИВИДУАЛЬНЫЙ СТИЛЬ</span></div></div>

      <section id="services" className="section services-section"><div className="container">
        <div className="section-heading reveal"><div><div className="eyebrow">01 / УСЛУГИ</div><h2>Стиль начинается здесь<span>.</span></h2></div><p>Ничего лишнего. Только то,<br />что делает тебя собой.</p></div>
        <div className="services-grid">{services.map((service, index) => { const Icon = [Scissors, Sparkles, ShieldCheck, Users][index] ?? Scissors; return <article className={`service-card reveal ${index === 2 ? 'featured-service' : ''}`} key={service.name}>
          <div className="service-top"><Icon strokeWidth={1.3} size={31} /><span className="service-number">0{index + 1}</span></div>
          {index === 2 && <span className="popular-label">ВЫБОР ДЖЕНТЛЬМЕНОВ</span>}
          <h3>{service.name}</h3><p>{service.detail}</p><span className="duration"><Clock3 size={13} />{service.duration}</span>
          <div className="service-bottom"><div><strong>{formatPrice(service.price)}</strong><span> сум</span></div><Button variant="ghost" size="icon" asChild><a href={bookingUrl(service.name)} target="_blank" rel="noopener noreferrer" aria-label={`Записаться: ${service.name}`}><ArrowUpRight /></a></Button></div>
        </article>; })}</div>
        <div className="service-note"><span><Check size={14} /> Мытьё головы, укладка и хороший кофе — включены.</span><span>Забота о деталях. Без доплат.</span></div>
      </div></section>

      <section id="masters" className="section masters-section"><div className="container">
        <div className="section-heading reveal"><div><div className="eyebrow">02 / МАСТЕРА</div><h2>Люди, которым доверяют<span>.</span></h2></div><p>У каждого — свой почерк.<br />У всех — внимание к тебе.</p></div>
        <div className="masters-grid">{masters.map((master, index) => <article className="master-card reveal" key={master.name}><div className={`master-photo master-photo-${index}`}><img src={team} loading="lazy" width={1536} height={1024} alt={`${master.name}, ${master.role}`} /><span className="experience">{master.experience}</span><div className="master-booking"><Booking label={`Записаться к мастеру`} service={`стрижка у мастера ${master.name}`} /></div></div><div className="master-info"><div><h3>{master.name}</h3><p>{master.specialty}</p></div><span>{master.role}</span></div></article>)}</div>
      </div></section>

      <section id="gallery" className="section gallery-section"><div className="container">
        <div className="section-heading reveal"><div><div className="eyebrow">03 / ГАЛЕРЕЯ</div><h2>Характер в каждом кадре<span>.</span></h2></div><span className="section-aside">НАШ СТИЛЬ. БЕЗ ФИЛЬТРОВ.</span></div>
        <div className="gallery-grid">{gallery.map((item, index) => <Button key={item.title} variant="ghost" className={`gallery-item gallery-item-${index} reveal`} onClick={() => setPhoto(index)} aria-label={`Открыть фото: ${item.title}`}><img src={item.image} loading="lazy" width={index === 1 ? 1920 : 1024} height={1024} alt={item.title} /><span className="gallery-caption"><span><small>{item.category}</small><strong>{item.title}</strong></span><ArrowUpRight /></span></Button>)}</div>
      </div></section>

      <section className="section reviews-section"><div className="container"><div className="section-heading reveal"><div><div className="eyebrow">СЛОВА, КОТОРЫЕ ВАЖНЫ</div><h2>Рекомендуют своим<span>.</span></h2></div><div className="reviews-score"><Star /><strong>4.9</strong><span>из 5 · отзывы клиентов</span></div></div><div className="reviews-grid">{reviews.map(review => <article className="review-card reveal" key={review.name}><div className="review-stars">{Array.from({ length: 5 }, (_, i) => <Star size={14} key={i} />)}</div><blockquote>«{review.text}»</blockquote><div className="review-person"><span className="review-avatar">{review.initials}</span><div><strong>{review.name}</strong><small>{review.date}</small></div><span className="review-check"><Check size={15} /></span></div></article>)}</div></div></section>

      <section id="contacts" className="section contacts-section"><div className="container contacts-grid"><div className="contact-copy reveal"><div className="eyebrow">04 / КОНТАКТЫ</div><h2>Твой следующий<br />шаг — к нам<span>.</span></h2><p>Оставь суету за дверью.<br />Остальное мы берём на себя.</p><Booking label="Выбрать время" /></div><div className="contact-details reveal"><div className="contact-row"><MapPin /><div><small>ЖДЁМ ТЕБЯ</small><strong>Ташкент, ул. Шота Руставели, 25</strong><a href="https://www.google.com/maps/search/?api=1&query=Ташкент+Шота+Руставели+25" target="_blank" rel="noopener noreferrer">Открыть на карте <ArrowUpRight size={14} /></a></div></div><div className="contact-row"><Clock3 /><div><small>КАЖДЫЙ ДЕНЬ</small><strong>10:00 — 21:00</strong><span>Без выходных. В твоём ритме.</span></div></div><div className="contact-row"><Phone /><div><small>НА СВЯЗИ</small><a className="contact-phone" href="tel:+998900000000">+998 90 000 00 00</a><div className="social-links"><a href="https://t.me/" target="_blank" rel="noopener noreferrer"><Send size={15} /> Telegram<ArrowUpRight size={13} /></a><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><Instagram size={15} /> Instagram<ArrowUpRight size={13} /></a><a href={bookingUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div></div></div><p className="demo-note">Демонстрационные адрес, телефон и часы работы.</p></div></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-top"><Brand footer /><nav aria-label="Навигация внизу страницы">{navigation.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav><div className="footer-social"><a href="https://t.me/" aria-label="Telegram" target="_blank" rel="noopener noreferrer"><Send size={18} /></a><a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a></div></div><div className="footer-bottom"><span>© 2026 GENTLEMAN BARBERSHOP</span><span>СОЗДАНО ДЛЯ ДЖЕНТЛЬМЕНОВ</span><a href="#home">Наверх <ArrowUpRight size={14} /></a></div><p className="footer-demo">Визуальный макет: мастера и отзывы вымышлены. Для записи в WhatsApp выберите получателя; аккаунты заведения не указаны.</p></div></footer>

    <Dialog open={photo !== null} onOpenChange={open => { if (!open) setPhoto(null); }}><DialogContent className="gallery-dialog"><DialogTitle>{photo !== null ? gallery[photo]?.title : 'Галерея'}</DialogTitle>{photo !== null && <><img src={gallery[photo]?.image} alt={gallery[photo]?.title} /><div className="gallery-controls"><Button variant="ghost" size="icon" aria-label="Предыдущее фото" onClick={() => setPhoto((photo + gallery.length - 1) % gallery.length)}><ChevronLeft /></Button><span>{photo + 1} / {gallery.length}</span><Button variant="ghost" size="icon" aria-label="Следующее фото" onClick={() => setPhoto((photo + 1) % gallery.length)}><ChevronRight /></Button></div></>}</DialogContent></Dialog>
  </>;
}
