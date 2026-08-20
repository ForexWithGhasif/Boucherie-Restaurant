"use client";

import {FormEvent,useEffect,useState} from "react";

type Restaurant={name:string;area:string;address:string;hours:string;phone:string;detail:string;url:string;bookUrl:string;paused?:boolean};
const cities:Record<string,Restaurant[]>={
  "NEW YORK":[
    {name:"La Grande Boucherie",area:"Midtown",address:"145 W 53rd St, New York, NY 10019",hours:"Mon–Fri 8am–12am · Sat–Sun 9am–12am",phone:"+1 (212) 510-7714",detail:"A grand Art Nouveau brasserie spanning the block of 6½ Avenue, with a soaring arched skylight, year-round gallery seating and the spirit of a Parisian square.",url:"https://www.boucherieus.com/location/boucherie-la-grande-boucherie/",bookUrl:"https://www.opentable.com/r/la-grande-boucherie-new-york"},
    {name:"Boucherie West Village",area:"West Village",address:"99 7th Avenue South, New York, NY 10014",hours:"Mon–Fri 11am–12am · Sat–Sun 10am–12am",phone:"+1 (212) 837-1616",detail:"Set in the former Circle Repertory Theater, this West Village address offers a spacious dining room, butcher counter, intimate second-floor gallery and outdoor café.",url:"https://www.boucherieus.com/location/boucherie-west-village/",bookUrl:"https://www.opentable.com/r/boucherie-new-york"},
    {name:"Boucherie Union Square",area:"Union Square",address:"225 Park Avenue South, New York, NY 10003",hours:"Mon–Fri 11am–12am · Sat–Sun 10am–12am",phone:"+1 (212) 353-0200",detail:"Majestic wooden-framed mirrors, original Belle Époque posters, burgundy leather booths and a handmade pewter bar create a timeless, intimate dining room.",url:"https://www.boucherieus.com/location/boucherie-union-square/",bookUrl:"https://www.opentable.com/r/boucherie-union-square-new-york"},
    {name:"Petite Boucherie",area:"West Village",address:"14 Christopher Street, New York, NY 10014",hours:"Mon–Fri 11am–12am · Sat–Sun 10am–12am",phone:"+1 (646) 756-4145",detail:"An intimate Belle Époque-inspired bistro at the historic intersection of Christopher and Gay Streets, created for timeless dishes and engaging conversation.",url:"https://www.boucherieus.com/location/boucherie-petite-boucherie-bistro/",bookUrl:"https://www.boucherieus.com/reservations/"}
  ],
  "CHICAGO":[{name:"La Grande Boucherie",area:"River North",address:"431 N. Dearborn Street, Chicago, IL 60654",hours:"Mon–Thu 12–11pm · Fri 12–11:30pm · Sat 11am–11:30pm · Sun 11am–11pm",phone:"+1 (312) 624-3014",detail:"A two-story Art Nouveau-inspired brasserie with stained-glass windows, mosaic marble floors and a racetrack bar sourced from France.",url:"https://www.boucherieus.com/location/chicago/",bookUrl:"https://www.opentable.com/r/la-grande-boucherie-chicago"}],
  "MIAMI":[{name:"La Grande Boucherie",area:"Miami Beach",address:"81 Washington Ave, Miami Beach, FL 33139",hours:"Currently taking a seasonal pause",phone:"+1 (305) 456-4732",detail:"A journey into the golden age of Paris with a lush garden, rich textures and spaces inspired by the avant-garde vision of Paul Poiret.",url:"https://www.boucherieus.com/location/la-grande-boucherie-miami/",bookUrl:"https://www.boucherieus.com/location/la-grande-boucherie-miami/",paused:true}],
  "WASHINGTON D.C.":[{name:"La Grande Boucherie",area:"Downtown",address:"699 14th Street NW, Washington, DC 20005",hours:"Mon–Fri 11am–12am · Sat–Sun 10am–12am",phone:"+1 (771) 208-4804",detail:"One block from the White House, this grand Art Nouveau dining room centers on a signature curved bar imported from Paris and gilded architectural details.",url:"https://www.boucherieus.com/location/la-grande-boucherie-dc/",bookUrl:"https://www.opentable.com/r/la-grande-boucherie-dc-washington"}]
};

type City=keyof typeof cities;

export default function Reservations(){
  const[city,setCity]=useState<City>("NEW YORK");
  const[menu,setMenu]=useState(false);
  const[selected,setSelected]=useState<Restaurant|null>(null);
  const[details,setDetails]=useState<Restaurant|null>(null);
  const[ready,setReady]=useState(false);
  const[party,setParty]=useState("2"),[date,setDate]=useState(""),[time,setTime]=useState("7:00 PM");
  useEffect(()=>{document.body.style.overflow=selected||details?"hidden":"";const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setSelected(null);setDetails(null)}};addEventListener("keydown",close);return()=>{document.body.style.overflow="";removeEventListener("keydown",close)}},[selected,details]);
  const find=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const data=new FormData(event.currentTarget);setParty(String(data.get("party")));setDate(String(data.get("date")));setTime(String(data.get("time")));setReady(true)};
  const[clock,meridiem]=time.split(" "),[hour,minute]=clock.split(":");
  const hour24=String((Number(hour)%12)+(meridiem==="PM"?12:0)).padStart(2,"0");
  const liveUrl=selected?`${selected.bookUrl}${selected.bookUrl.includes("opentable.com")?`?covers=${party}&dateTime=${date}T${hour24}%3A${minute}%3A00`:""}`:"";
  return <main className="booking-page">
    <header className="booking-header">
      <a className="logo" href="/"><b>BOUCHERIE</b><span>RESTAURANT FRANÇAIS</span></a>
      <nav className={menu?"open":""} aria-label="Main navigation">
        <a href="/#locations">Locations</a><a href="/#menu">Menus</a><a href="/#story">Our Story</a><a href="/#events">Events</a><a href="/#reviews">Reviews</a>
      </nav>
      <a className="btn ivory booking-home" href="/">Return home</a>
      <button className="hamb" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Toggle menu"><i/><i/></button>
    </header>

    <section className="booking-hero">
      <div className="booking-hero-copy"><p className="kicker">RESERVATIONS</p><h1>Your table<br/><em>awaits.</em></h1><p>Choose your city and restaurant. We’ll take you directly to Boucherie’s official booking experience.</p></div>
      <div className="booking-note"><span>01</span><p>Reservations are recommended and are completed through Boucherie’s official booking partners.</p></div>
    </section>

    <section className="booking-select" aria-labelledby="choose-location">
      <div className="booking-intro"><p className="kicker dark">CHOOSE YOUR BOUCHERIE</p><h2 id="choose-location">Where shall<br/><em>we meet?</em></h2></div>
      <div className="booking-tabs" role="tablist" aria-label="Choose a city">{(Object.keys(cities) as City[]).map(name=><button role="tab" aria-selected={city===name} key={name} onClick={()=>setCity(name)}>{name}</button>)}</div>
      <div className="restaurant-grid">{cities[city].map((restaurant,index)=><article className="restaurant-card" key={restaurant.name+restaurant.area}>
        <div className="restaurant-number">0{index+1}</div><div className="restaurant-copy"><p>{restaurant.area}</p><h3>{restaurant.name}</h3><address>{restaurant.address}<br/>{restaurant.hours}{restaurant.phone&&<><br/><a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a></>}</address></div>
        <div className="restaurant-actions"><button className="detail-link" onClick={()=>setDetails(restaurant)}>View details</button>{restaurant.paused?<span className="seasonal-label">Seasonal pause</span>:<button className="btn gold" onClick={()=>{setSelected(restaurant);setReady(false)}}>Find a table</button>}</div>
      </article>)}</div>
    </section>

    <section className="booking-confidence"><div><p className="kicker">A BEAUTIFUL EVENING BEGINS HERE</p><h2>Good food.<br/><em>Joie de vivre.</em></h2></div><div className="confidence-list"><p><span>01</span>Select your preferred location</p><p><span>02</span>Check live availability with the official booking partner</p><p><span>03</span>Receive confirmation directly from the restaurant</p></div></section>

    <section className="booking-celebrate"><div><p className="kicker">PRIVATE DINING &amp; EVENTS</p><h2>Planning something<br/><em>extraordinary?</em></h2><p>For celebrations, corporate dinners and private occasions, discover Boucherie’s event spaces.</p><a className="btn ivory" href="https://www.boucherieus.com/events/">Explore events</a></div></section>

    <footer className="booking-footer"><div className="footbrand"><div className="logo"><b>BOUCHERIE</b><span>RESTAURANT FRANÇAIS</span></div><p>A celebration of good food<br/>and <i>joie de vivre.</i></p></div><div><h4>Visit</h4><a href="/#locations">New York</a><a href="/#locations">Chicago</a><a href="/#locations">Miami</a><a href="/#locations">Washington D.C.</a></div><div><h4>Discover</h4><a href="/#story">Our Story</a><a href="/#events">Events</a><a href="/#reviews">Reviews</a></div><div><h4>Connect</h4><a href="https://www.instagram.com/boucherie_us/">Instagram</a><a href="https://www.boucherieus.com/contact/">Contact</a></div><div className="footbottom"><span>© 2026 Boucherie · Redesign concept</span><a href="https://www.boucherieus.com/privacy-policy/">Privacy</a><a href="#top">Back to top ↑</a></div></footer>

    {selected&&<div className="table-modal" role="dialog" aria-modal="true" aria-labelledby="table-modal-title" onMouseDown={event=>event.target===event.currentTarget&&setSelected(null)}>
      <div className="table-panel"><button className="table-close" onClick={()=>setSelected(null)} aria-label="Close reservation finder">×</button>
        <div className="table-visual"><div><p className="kicker">VOTRE TABLE</p><span>Good food.<br/><i>Beautiful company.</i></span></div></div>
        <div className="table-form-wrap"><p className="kicker dark">FIND A TABLE</p><h2 id="table-modal-title">Plan your<br/><em>evening.</em></h2><div className="chosen-restaurant"><span>{city}</span><strong>{selected.name}</strong><small>{selected.area}</small></div>
          {!ready?<form className="table-form" onSubmit={find}>
            <label>Party size<select required name="party" defaultValue={party}><option value="1">1 guest</option>{[2,3,4,5,6,7,8].map(size=><option value={size} key={size}>{size} guests</option>)}<option value="9">9+ guests</option></select></label>
            <label>Date<input required name="date" type="date" defaultValue={date}/></label>
            <label>Preferred time<select required name="time" defaultValue={time}><option>5:00 PM</option><option>5:30 PM</option><option>6:00 PM</option><option>6:30 PM</option><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option><option>8:30 PM</option><option>9:00 PM</option><option>9:30 PM</option><option>10:00 PM</option></select></label>
            <button className="btn gold table-submit" type="submit">Check availability</button><p className="form-note">Live availability and final confirmation are provided by Boucherie’s official booking partner.</p>
          </form>:<div className="table-ready"><span>✦</span><h3>Check live tables</h3><div className="booking-summary"><b>{party} {party==="1"?"guest":"guests"}</b><b>{date}</b><b>{time}</b></div><p>Live inventory changes constantly. OpenTable will now show the actual available tables for your selected restaurant and complete the reservation securely.</p><a className="btn gold" href={liveUrl}>Open live availability ↗</a><button onClick={()=>setReady(false)}>Change details</button></div>}
        </div>
      </div>
    </div>}

    {details&&<div className="table-modal details-modal" role="dialog" aria-modal="true" aria-labelledby="details-title" onMouseDown={event=>event.target===event.currentTarget&&setDetails(null)}><article className="details-panel"><button className="table-close" onClick={()=>setDetails(null)} aria-label="Close restaurant details">×</button><div className="details-image"/><div className="details-copy"><p className="kicker dark">{details.area}</p><h2 id="details-title">{details.name}</h2><p className="details-lead">{details.detail}</p><div className="details-facts"><div><span>Address</span><address>{details.address}</address></div><div><span>Hours</span><p>{details.hours}</p></div><div><span>Telephone</span><a href={`tel:${details.phone}`}>{details.phone}</a></div></div><div className="details-actions"><a className="detail-link" href={details.url}>Official location page ↗</a>{!details.paused&&<button className="btn gold" onClick={()=>{setDetails(null);setSelected(details);setReady(false)}}>Find a table</button>}</div>{details.paused&&<p className="pause-note">This location is currently taking a seasonal pause. Please check the official location page for reopening updates.</p>}</div></article></div>}
  </main>
}
