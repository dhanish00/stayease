import { useMemo, useState } from 'react'
import { Search, MapPin, CalendarDays, Users, BedDouble, Heart, SlidersHorizontal, ChevronDown, Star, Wifi, Car, Coffee, Waves, Check, ShieldCheck, Map, Menu, X, ArrowUpDown, ChevronRight, BadgePercent } from 'lucide-react'
import { hotels, type Hotel } from './data'

const money = (n:number) => '₹' + n.toLocaleString('en-IN')
function App() {
 const [destination,setDestination] = useState('Bengaluru')
 const [checkin,setCheckin] = useState('2026-10-16')
 const [checkout,setCheckout] = useState('2026-10-18')
 const [guests,setGuests] = useState(2)
 const [rooms,setRooms] = useState(1)
 const [query,setQuery] = useState('')
 const [maxPrice,setMaxPrice] = useState(25000)
 const [minRating,setMinRating] = useState(0)
 const [minStars,setMinStars] = useState(0)
 const [freeCancel,setFreeCancel] = useState(false)
 const [breakfast,setBreakfast] = useState(false)
 const [pool,setPool] = useState(false)
 const [sort,setSort] = useState('Recommended')
 const [favorites,setFavorites] = useState<number[]>([])
 const [mobileFilters,setMobileFilters] = useState(false)
 const [selected,setSelected] = useState<Hotel|null>(null)
 const [toast,setToast] = useState('')
 const [showGuests,setShowGuests] = useState(false)
 const [showSearch,setShowSearch] = useState(false)
 const filtered = useMemo(() => {
  let list = hotels.filter(h => (h.city.toLowerCase().includes(destination.toLowerCase()) || destination.trim()==='') &&
   (h.name+' '+h.area+' '+h.city).toLowerCase().includes(query.toLowerCase()) &&
   h.price <= maxPrice && h.rating >= minRating && h.stars >= minStars &&
   (!freeCancel || h.tags.includes('Free cancellation')) && (!breakfast || h.tags.includes('Breakfast')) && (!pool || h.tags.includes('Swimming pool')))
  if(sort==='Price: lowest first') list=[...list].sort((a,b)=>a.price-b.price)
  if(sort==='Price: highest first') list=[...list].sort((a,b)=>b.price-a.price)
  if(sort==='Guest rating') list=[...list].sort((a,b)=>b.rating-a.rating)
  if(sort==='Star rating') list=[...list].sort((a,b)=>b.stars-a.stars)
  return list
 },[destination,query,maxPrice,minRating,minStars,freeCancel,breakfast,pool,sort])
 const toggleFavorite = (id:number) => setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id])
 const notify = (message:string) => {setToast(message); window.setTimeout(()=>setToast(''),2600)}
 const doSearch = () => {setShowSearch(false); notify(`Showing stays in ${destination || 'all destinations'}`)}
 const filters = <div className="filter-content">
  <div className="filter-head"><strong>Filter by</strong><button className="text-button" onClick={()=>{setQuery('');setMaxPrice(25000);setMinRating(0);setMinStars(0);setFreeCancel(false);setBreakfast(false);setPool(false)}}>Reset</button></div>
  <label className="filter-label">Property name</label><input className="text-input" placeholder="Search hotels" value={query} onChange={e=>setQuery(e.target.value)}/>
  <div className="filter-group"><div className="filter-title"><span>Price per night</span><b>{money(maxPrice)}</b></div><input aria-label="Maximum price per night" type="range" min="2000" max="25000" step="500" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/><div className="range-labels"><span>₹2,000</span><span>₹25,000+</span></div></div>
  <div className="filter-group"><div className="filter-title">Guest rating</div>{[[0,'Any rating'],[7,'7+ Good'],[8,'8+ Very good'],[9,'9+ Exceptional']].map(([v,label])=><label className="check-row" key={String(v)}><input type="radio" name="rating" checked={minRating===v} onChange={()=>setMinRating(Number(v))}/><span>{label}</span></label>)}</div>
  <div className="filter-group"><div className="filter-title">Star rating</div><div className="star-filters">{[3,4,5].map(n=><button key={n} className={minStars===n?'star-chip active':'star-chip'} onClick={()=>setMinStars(minStars===n?0:n)}>{n} <Star size={13} fill="currentColor"/></button>)}</div></div>
  <div className="filter-group"><div className="filter-title">Popular filters</div>{[['Free cancellation',freeCancel,setFreeCancel],['Breakfast included',breakfast,setBreakfast],['Swimming pool',pool,setPool]].map(([label,value,setter])=><label className="check-row" key={String(label)}><input type="checkbox" checked={Boolean(value)} onChange={e=>(setter as (v:boolean)=>void)(e.target.checked)}/><span>{String(label)}</span></label>)}</div>
  <div className="filter-group"><div className="filter-title">Amenities</div><div className="amenity-mini"><span><Wifi size={15}/> Free Wi-Fi</span><span><Car size={15}/> Parking</span><span><Coffee size={15}/> Breakfast</span><span><Waves size={15}/> Pool</span></div></div>
 </div>
 return <div className="app-shell">
  <header className="topbar"><div className="topbar-inner"><button className="hamburger" onClick={()=>setMobileFilters(true)} aria-label="Open menu"><Menu/></button><a className="brand" href="#"><span className="brand-mark">S</span><span>stayease</span></a><nav className="main-nav"><a className="nav-active" href="#">Stays</a><a href="#deals">Deals</a><a href="#help">Help</a></nav><div className="top-actions"><button className="language">🇮🇳 <span>INR</span><ChevronDown size={14}/></button><button className="outline-btn" onClick={()=>notify('Demo sign-in is not connected to an account service.')}>Sign in</button><button className="primary-small" onClick={()=>notify('Create-account demo coming soon')}>Create account</button></div></div></header>
  <div className="promo-strip"><span className="promo-icon"><BadgePercent size={18}/></span><span><b>Stay somewhere great.</b> Find member-only prices on stays around the world.</span><button onClick={()=>notify('Demo offer applied to eligible sample stays')}>Explore deals <ChevronRight size={14}/></button></div>
  <main>
   <section className="search-panel">
    <div className="breadcrumb">Home <ChevronRight size={12}/> India <ChevronRight size={12}/> Karnataka <ChevronRight size={12}/> <b>Bengaluru</b></div>
    <h1>Hotels in Bengaluru</h1><p className="subheading">Find your perfect stay from our handpicked sample properties.</p>
    <div className="search-fields">
     <label className="search-field destination-field"><MapPin size={19}/><span className="field-wrap"><small>Destination</small><input value={destination} onChange={e=>setDestination(e.target.value)} placeholder="Where to?" /></span></label>
     <label className="search-field"><CalendarDays size={19}/><span className="field-wrap"><small>Check-in</small><input type="date" value={checkin} onChange={e=>setCheckin(e.target.value)}/></span></label>
     <label className="search-field"><CalendarDays size={19}/><span className="field-wrap"><small>Check-out</small><input type="date" value={checkout} onChange={e=>setCheckout(e.target.value)}/></span></label>
     <button className="search-field guest-field" onClick={()=>setShowGuests(!showGuests)}><Users size={19}/><span className="field-wrap"><small>Guests & rooms</small><b>{guests} guests · {rooms} room{rooms>1?'s':''}</b></span><ChevronDown size={15}/></button>
     <button className="search-button" onClick={doSearch}><Search size={18}/> Search</button>
     {showGuests&&<div className="guest-popover"><div className="guest-line"><span>Adults & children</span><div><button onClick={()=>setGuests(Math.max(1,guests-1))}>−</button><b>{guests}</b><button onClick={()=>setGuests(Math.min(12,guests+1))}>+</button></div></div><div className="guest-line"><span>Rooms</span><div><button onClick={()=>setRooms(Math.max(1,rooms-1))}>−</button><b>{rooms}</b><button onClick={()=>setRooms(Math.min(8,rooms+1))}>+</button></div></div><button className="done-button" onClick={()=>setShowGuests(false)}>Done</button></div>}
    </div>
    <div className="trust-row"><span><ShieldCheck size={15}/> Flexible search options</span><span><Check size={15}/> Handpicked stays</span><span><Check size={15}/> Sample prices in INR</span></div>
   </section>
   <div className="results-meta"><div><h2>Our top picks in Bengaluru</h2><p>{filtered.length} properties match your search <span className="demo-pill">DEMO LISTINGS</span></p></div><div className="sort-wrap"><label htmlFor="sort"><ArrowUpDown size={16}/> Sort by</label><select id="sort" value={sort} onChange={e=>setSort(e.target.value)}><option>Recommended</option><option>Price: lowest first</option><option>Price: highest first</option><option>Guest rating</option><option>Star rating</option></select></div></div>
   <div className="content-layout"><aside className="filters-desktop">{filters}<div className="map-card"><div className="map-visual"><Map size={28}/><span>Explore Bengaluru</span></div><button onClick={()=>notify('Map preview is a demo placeholder')}>Show on map</button></div></aside>
    <section className="hotel-results"><div className="mobile-filter-row"><button className="mobile-filter-button" onClick={()=>setMobileFilters(true)}><SlidersHorizontal size={16}/> Filters</button><span>{filtered.length} stays found</span></div>
    {filtered.map(h=><article className="hotel-card" key={h.id}><div className="hotel-image-wrap"><img className="hotel-image" src={h.image} alt={h.name}/>{h.badge&&<span className="image-badge">{h.badge}</span>}<button className={favorites.includes(h.id)?'heart-button liked':'heart-button'} onClick={()=>toggleFavorite(h.id)} aria-label={favorites.includes(h.id)?'Remove favorite':'Add favorite'}><Heart size={19} fill={favorites.includes(h.id)?'currentColor':'none'}/></button><span className="photo-count">▧ 1/6</span></div>
      <div className="hotel-info"><div className="hotel-title-row"><div><h3>{h.name}</h3><div className="stars">{Array.from({length:h.stars},(_,i)=><Star size={13} key={i} fill="currentColor"/>)}</div></div><span className="review-score">{h.rating.toFixed(1)}</span></div><p className="hotel-location"><MapPin size={13}/>{h.area}, {h.city} <span>· {h.distance}</span></p><p className="hotel-description">{h.description}</p><div className="amenities">{h.tags.slice(0,3).map(t=><span key={t}>{t==='Free Wi-Fi'?<Wifi size={13}/>:t==='Breakfast'?<Coffee size={13}/>:t==='Swimming pool'?<Waves size={13}/>:<Check size={13}/>} {t}</span>)}</div><div className="cancellation">{h.tags.includes('Free cancellation')&&<span><Check size={14}/> Free cancellation</span>}{h.tags.includes('Breakfast')&&<span><Check size={14}/> Breakfast option</span>}</div></div>
      <div className="price-panel">{h.deal&&<span className="deal-label">{h.deal}</span>}<div className="review-copy"><b>{h.rating>=9?'Exceptional':h.rating>=8.5?'Excellent':h.rating>=8?'Very good':'Good'}</b><small>{h.reviews.toLocaleString('en-IN')} reviews</small></div><div className="price-spacer"/>{h.oldPrice&&<div className="old-price">{money(h.oldPrice)}</div>}<div className="price">{money(h.price)} <small>/ night</small></div><div className="tax-note">Includes sample taxes & fees</div><button className="view-button" onClick={()=>setSelected(h)}>See availability <ChevronRight size={16}/></button><small className="availability-note">Sample availability only</small></div>
     </article>)}
     {filtered.length===0&&<div className="empty-state"><Search size={32}/><h3>No stays match those filters</h3><p>Try changing your destination or relaxing a filter.</p><button className="view-button" onClick={()=>{setQuery('');setMaxPrice(25000);setMinRating(0);setMinStars(0);setFreeCancel(false);setBreakfast(false);setPool(false)}}>Clear filters</button></div>}
     <div className="bottom-note"><ShieldCheck size={18}/><div><b>Plan with confidence</b><p>These listings, prices and availability are sample data for a frontend demo. No real booking is made.</p></div></div>
    </section>
   </div>
  </main>
  <footer><div className="footer-inner"><a className="brand" href="#"><span className="brand-mark">S</span><span>stayease</span></a><span>Find a stay that feels like yours.</span><span>© 2026 StayEase · Demo experience</span></div></footer>
  {mobileFilters&&<div className="drawer-backdrop" onClick={()=>setMobileFilters(false)}><div className="mobile-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-top"><b>Filters</b><button onClick={()=>setMobileFilters(false)} aria-label="Close filters"><X/></button></div>{filters}<button className="search-button apply-filters" onClick={()=>setMobileFilters(false)}>Show {filtered.length} properties</button></div></div>}
  {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="hotel-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close"><X/></button><img src={selected.image} alt={selected.name}/><div className="modal-body"><span className="demo-pill">SAMPLE PROPERTY</span><h2>{selected.name}</h2><p className="hotel-location"><MapPin size={14}/>{selected.area}, {selected.city}</p><p>{selected.description}</p><div className="modal-price"><span>Sample rate per night</span><b>{money(selected.price)}</b></div><p className="modal-warning">This is a frontend demo. Live availability and reservations are not connected.</p><button className="search-button full-width" onClick={()=>{setSelected(null);notify('Demo booking flow would start here. No reservation was created.')}}>Continue to demo booking</button></div></div></div>}
  {toast&&<div className="toast">{toast}</div>}
 </div>
}
export default App
