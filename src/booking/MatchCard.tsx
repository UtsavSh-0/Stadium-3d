import { Link } from '@tanstack/react-router';
import { ArrowUpRight, CalendarDays, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { matchDate, money, type Match } from './inventory';
import { useBooking } from './BookingProvider';
export function TeamCrest({ code, away = false }: { code: string; away?: boolean }) { return <span className={`crest ${away ? 'crest-away' : ''}`} aria-label={`${code} demo team crest`}>{code}</span>; }
export function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const { selectMatch } = useBooking();
  return <article className="match-card"><div className="match-card-top"><span className="text-muted-foreground">{match.competition}</span><span className="status">{match.status}</span></div><div className="team-line"><div className="team"><TeamCrest code={match.homeCode} /><strong>{match.home}</strong></div><span className="font-display text-xl text-muted-foreground">VS</span><div className="team"><TeamCrest code={match.awayCode} away /><strong>{match.away}</strong></div></div><div className="match-details"><span className="flex items-center gap-1.5"><CalendarDays size={12} />{matchDate(match.date)}, 2026</span><span className="text-border">|</span><span className="flex items-center gap-1.5"><Clock size={12} />{match.time} IST</span></div>{!compact && <div className="match-details mt-3"><MapPin size={12} />OMNYA LAB STADIUM</div>}<div className="match-card-bottom"><div><div className="price-label">TICKETS FROM</div><div className="price">{money(match.price)}</div></div><Button asChild variant="ticket" size="sm"><Link to="/stadium" onClick={() => selectMatch(match.id)}>{compact ? 'BOOK NOW' : 'SELECT MATCH'}<ArrowUpRight /></Link></Button></div></article>;
}