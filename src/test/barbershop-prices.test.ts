import { describe, expect, it } from 'vitest';
import { services } from '@/lib/barbershop-data';

describe('Requested service prices', () => {
  it('prices a men’s haircut at 100 000 sum', () => expect(services.find(s => s.name === 'Мужская стрижка')?.price).toBe(100000));
  it('prices a beard trim at 60 000 sum', () => expect(services.find(s => s.name === 'Стрижка бороды')?.price).toBe(60000));
  it('prices a haircut and beard at 140 000 sum', () => expect(services.find(s => s.name === 'Стрижка + борода')?.price).toBe(140000));
  it('prices a child’s haircut at 80 000 sum', () => expect(services.find(s => s.name === 'Детская стрижка')?.price).toBe(80000));
});