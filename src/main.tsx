import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Clock3, Instagram, MapPin, Menu, X } from "lucide-react";
import "./styles.css";

const local = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const images = {
  hero: `${import.meta.env.BASE_URL}assets/0.png`,
  cafe: `${import.meta.env.BASE_URL}assets/3.jpg`,
  vibe: `${import.meta.env.BASE_URL}assets/4.jpg`,
  owner: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmLeLQzq1c76s2mVai4MTPd3BWfOad7VR7BXCNAgNBFgbmbVAus63UhbFQFUpZDwSWMKp0Bcbsc0E-7JZCJLL_TtnWR4o1mbwzy1riy7XMC9tqb2OT3vHe8-cUjbC9nJrl-dQ8DXxnhYLY=w224-h298-k-no",
  ritual: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=88",
  place: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=88",
  room: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85",
  coffee: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=90",
  pastry: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=90",
  one: `${import.meta.env.BASE_URL}assets/1.jpg`,
  two: `${import.meta.env.BASE_URL}assets/2.jpg`,
  three: `${import.meta.env.BASE_URL}assets/3.jpg`,
  four: `${import.meta.env.BASE_URL}assets/4.jpg`,
  five: `${import.meta.env.BASE_URL}assets/5.png`,

};

const menuGroups = [
  {
    title: "Adicionais",
    intro: "Small extras to make your order exactly the way you like it.",
    items: [
      ["Bacon", "Crisp bacon", "R$ 4,00"],
      ["Ovo Frito", "Fried egg", "R$ 4,00"],
      ["Queijo Mussarela", "Mozzarella cheese", "R$ 3,00"],
      ["Requeijão", "Brazilian creamy cheese", "R$ 3,00"],
    ]
  },
  {
    title: "Café da Manhã",
    intro: "Comforting breakfast classics, made for slow mornings.",
    items: [
      ["Pão C/ 2 Ovos", "Bread with two eggs", "R$ 10,00"],
      ["Pão C/ Ovo E Queijo", "Bread with egg and cheese", "R$ 12,00"],
      ["Misto Quente", "Ham and melted cheese", "R$ 8,00"],
      ["Queijo Quente", "Warm melted cheese sandwich", "R$ 8,00"],
      ["Pão Na Chapa", "Griddled bread", "R$ 4,00"],
      ["Omelete", "Ovos c/ queijo, presunto, tomate", "R$ 18,00"],
      ["Sanduíche De Waffle De Peito De Peru Com Queijo Gratinado", "Waffle sandwich with turkey breast and gratinated cheese", "R$ 20,00"],
      ["Sanduíche De Waffle Com Recheio De Frango Desfiado + Queijo Gratinado Por Cima", "Shredded chicken waffle sandwich with gratinated cheese", "R$ 22,00"],
      ["Americano", "Três ovos mexidos, bacon e 2 pães de forma", "R$ 18,00"],
      ["Cuscuz De Carne Assada Com Requeijão", "Brazilian couscous with roast beef and creamy cheese", "R$ 23,00"],
      ["Cuscuz De Linguiça Toscana C/ Requeijão", "Brazilian couscous with Toscana sausage and creamy cheese", "R$ 20,00"],
      ["Cuscuz Com Manteiga E Ovos Mexidos", "Brazilian couscous with butter and scrambled eggs", "R$ 18,00"],
    ]
  },
  {
    title: "Sanduíches",
    intro: "Generous fillings, toasted bread and café comfort.",
    items: [
      ["Contra Filé", "C/ queijo mussarela gratinado no pão de alho.", "R$ 27,00"],
      ["Fraldinha Desfiada", "C/ queijo mussarela e molho barbecue.", "R$ 25,00"],
      ["Carne Assada", "C/ queijo mussarela e salada.", "R$ 23,00"],
      ["Frango Empanado", "C/ maionese verde, salada e queijo", "R$ 20,00"],
      ["Filé De Frango", "C/ queijo, catupiry e salada.", "R$ 17,00"],
      ["Linguiça Toscana", "C/ queijo e molho de requeijão.", "R$ 17,00"],
      ["Latino Americano", "2 ovos, bacon, queijo, presunto, salada e molho", "R$ 17,00"],
      ["Sanduíche Natural", "Frango, cenoura, milho e alface.", "R$ 15,00"],
    ]
  },
  {
    title: "Tapioca",
    intro: "Brazilian comfort food with savory fillings.",
    items: [
      ["Carne Assada C/ Requeijão", "Roast beef with creamy cheese", "R$ 20,00"],
      ["Frango C/ Requeijão", "Chicken with creamy cheese", "R$ 17,00"],
      ["Linguiça Toscana C/ Req", "Toscana sausage with creamy cheese", "R$ 17,00"],
      ["Queijo C/ Presunto", "Cheese and ham", "R$ 15,00"],
      ["Queijo Mussarela", "Mozzarella cheese", "R$ 12,00"],
    ]
  },
  {
    title: "Sobremesas",
    intro: "Sweet plates worth staying a little longer for.",
    items: [
      ["Waffle De Banana Nevada", "Banana and nevado waffle", "R$ 18,00"],
      ["Waffle - Nutella E Sorvete", "Waffle with Nutella and ice cream", "R$ 18,00"],
      ["Brownie C/ Sorvete E Nutella", "Brownie with ice cream and Nutella", "R$ 18,00"],
      ["Tapioca De Nutella", "Tapioca with Nutella", "R$ 16,00"],
      ["Panelinha De Brownie Com Sorvete E Ganache E Nutella", "Brownie, ice cream, ganache and Nutella", "R$ 25,00"],
    ]
  },
  {
    title: "Cafés",
    intro: "From a simple coado to a table-side Clever brew.",
    items: [
      ["Café Coado Simples", "Simple filtered coffee", "R$ 5,00"],
      ["Café Espresso 100ml", "Espresso", "R$ 5,00"],
      ["Café Espresso 200ml", "Double-size espresso", "R$ 10,00"],
      ["Café Com Leite Espresso", "Espresso with milk", "R$ 12,00"],
      ["Café Coado Na Cléver P/2", "Clever-brewed coffee for two", "R$ 20,00"],
    ]
  },
  {
    title: "Cappuccinos",
    intro: "Creamy coffee creations, from classic to indulgent.",
    items: [
      ["Cappuccino Tradicional", "Traditional cappuccino", "R$ 12,00"],
      ["Cappuccino Saborizado Com Borda De Nutella E Chantilly", "300ml", "R$ 18,00"],
      ["Sorvepleno", "Cappuccino + sorvete e Nutella", "R$ 20,00"],
      ["Chocolate Cremoso Com Chantilly", "Creamy chocolate with whipped cream", "R$ 18,00"],
      ["Mocha Nutella", "Nutella, cappuccino espumado e chantilly.", "R$ 20,00"],
      ["Mocha Ovomaltine", "Nutella, cappuccino espumado e Ovomaltine.", "R$ 20,00"],
      ["Frappucino De Ovomaltine", "Taça com Nutella, sorvete de creme, Ovomaltine e cappuccino", "R$ 20,00"],
    ]
  },
  {
    title: "Bebidas",
    intro: "Refreshing drinks, juices, shakes and açaí.",
    items: [
      ["Refrigerante Lata Ou Ks", "Soft drink can or KS bottle", "R$ 6,00"],
      ["Del Valle", "Fruit drink", "R$ 8,00"],
      ["Soda Refrescante De Morango", "Refreshing strawberry soda", "R$ 18,00"],
      ["Copo De Suco Natural 300ml", "Fresh natural juice", "R$ 13,00"],
      ["Jarra De Suco Natural 1l", "Consultar sabores.", "R$ 28,00"],
      ["Milkshake 500ml", "Ovomaltine ou morango.", "R$ 18,00"],
      ["Morango Ao Leite", "Strawberry with milk", "R$ 18,00"],
      ["Vitamina De Banana C Aveia", "Banana smoothie with oats", "R$ 15,00"],
      ["Taça De Açaí Com Leite Em Pó E Leite Condensado", "Açaí with powdered milk and condensed milk", "R$ 19,90"],
      ["Taça De Açaí Com Doce De Leite E Amendoim Por Fora", "Açaí with dulce de leche and peanuts", "R$ 22,90"],
    ]
  },
  {
    title: "Combos",
    intro: "Easy pairings for a complete café moment.",
    items: [
      ["Cuscuz Com Linguiça + Café Orfeu", "Coado na mesa com cafeteira Clever", "Consultar"],
      ["Refrigerante + Latino", "Combo com sanduíche Latino Americano", "Consultar"],
      ["Refrigerante + Sanduíche De Carne Assada", "Combo com sanduíche de carne assada", "Consultar"],
    ]
  }
];

function Reveal({ children, className = "" }: {children: React.ReactNode; className?: string}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        io.disconnect();
      }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <main>
      <header className="nav">
        <button className="brand" onClick={() => go("top")} aria-label="Pleno Café home">
          <div className="brand">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="Pleno Café logo"
              className="brand-logo"
            />

            <span className="brand-name">
              PLENO<br />
              <i>Café & Bistrô</i>
            </span>
          </div>
        </button>
        <nav className="desktop-nav">
          <button onClick={() => go("story")}>Story</button>
          <button onClick={() => go("menu")}>Menu</button>
          <button onClick={() => go("space")}>Space</button>
          <button onClick={() => go("visit")}>Visit</button>
        </nav>
        <button className="nav-cta" onClick={() => go("visit")}>Find us <ArrowUpRight size={15}/></button>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
      </header>

      {open && <div className="mobile-menu">
        <button onClick={() => go("story")}>Story</button>
        <button onClick={() => go("menu")}>Menu</button>
        <button onClick={() => go("space")}>Space</button>
        <button onClick={() => go("visit")}>Visit</button>
      </div>}

      <section className="hero" id="top">
        <div className="hero-image" style={{backgroundImage:`url(${images.hero})`}} />
        <div className="hero-shade"/>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">SÃO PAULO · VILA PROGREDIOR</p>
            <h1>Take a<br/><em>little</em> time.</h1>
            <p className="hero-sub">Coffee, food and good company.<br/>Made for the moments in between.</p>
            <button className="circle-link" onClick={() => go("story")}><ArrowDown size={20}/><span>Explore</span></button>
          </div>
          <div className="hero-cafe-photo" style={{backgroundImage:`url(${images.cafe})`}}>
            <span>PLENO / IN THE NEIGHBORHOOD</span>
          </div>
        </div>
        <div className="hero-side">PLENO / 01</div>
        <div className="hero-bottom"><span>4.8 <b>★</b></span><span>COFFEE SHOP</span><span>DINE-IN</span></div>
      </section>

      <section className="statement" id="story">
        <Reveal>
          <div className="place-heading">
            <div>
              <p className="section-kicker">01 / THE PLACE</p>
              <h2>Not every moment<br/>needs to be <em>productive.</em><br/>Some are meant<br/>to simply be.</h2>
            </div>
            <div className="place-photo" style={{backgroundImage:`url(${images.hero})`}}>
              <span>THE PLACE / PLENO</span>
            </div>
          </div>
          <div className="statement-grid">
            <p>Pleno is a place to slow down for a while. A warm coffee, something fresh from the kitchen, and a quiet table can turn an ordinary morning into something worth remembering. It’s where conversations begin naturally, meals are enjoyed without hurry, and there is always time for one more coffee.</p>
            <p>Come in for breakfast, stay for lunch, meet someone you love, or simply take a little time for yourself. Leave the noise of the city outside and settle into a space made for good food, easy conversations, and unhurried moments.</p>
            <p>Because the best memories are often found in the simplest rituals — the first sip of coffee, a familiar table, a shared laugh, and those moments when you decide there’s no reason to leave just yet.</p>
          </div>
          <div className="statement-foot">
            <span>AV. PROF. FRANCISCO MORATO · SÃO PAULO</span>
            <span>SCROLL TO DISCOVER ↓</span>
          </div>
        </Reveal>
      </section>

      <section className="image-story" id="ritual">
        <div className="ritual-image" style={{backgroundImage:`url(${images.ritual})`}} />
        <Reveal className="image-copy">
          <p className="section-kicker">02 / THE RITUAL</p>
          <h3>Good coffee<br/><em>changes</em> the pace.</h3>
          <p>There is something quietly beautiful about watching a simple thing being made with attention. The sound of grinding beans. The first pour. Steam rising from the cup. A plate placed on the table while it is still warm.</p>
          <p>At Pleno, the ritual is part of the experience. Not because it has to be complicated — but because care can be felt in the little things.</p>
          <p>It is the pause before the first sip, the warmth between your hands, and the feeling that for a few minutes, nothing else needs your attention.</p>
        </Reveal>
        <div className="ritual-caption">COFFEE · CONVERSATION · TIME</div>
      </section>

      <section className="menu-section" id="menu">
        <Reveal>
          <div className="menu-header">
            <div>
              <p className="section-kicker">03 / MENU</p>
              <h2>Come hungry.<br/><em>Leave happy.</em></h2>
              <p className="menu-intro">The menu has been carefully transcribed from the café's original printed menu, so guests can explore every section before they arrive.</p>
            </div>
          </div>

          <div className="menu-tabs">
            {menuGroups.map((group, i) => (
              <button className={activeGroup===i ? "active":""} onClick={() => setActiveGroup(i)} key={group.title}>
                <span>0{i+1}</span>{group.title}
              </button>
            ))}
          </div>

          <div className="menu-detail">
            <div className="menu-detail-head">
              <div><span className="menu-index">0{activeGroup+1}</span><h3>{menuGroups[activeGroup].title}</h3></div>
              <p>{menuGroups[activeGroup].intro}</p>
            </div>
            <div className="menu-list">
              {menuGroups[activeGroup].items.map(([name, desc, price], i) => (
                <div className="menu-row" key={name}>
                  <span className="menu-num">0{i+1}</span>
                  <div><h4>{name}</h4><p>{desc}</p></div>
                  <strong>{price}</strong>
                </div>
              ))}
            </div>
          </div>

        </Reveal>
      </section>

      <section className="space-section" id="space">
        <div className="space-image" style={{backgroundImage:`url(${images.one})`}} />
        <div className="space-copy">
          <p className="section-kicker">04 / THE ROOM</p>
          <h2>Come for the<br/><em>coffee.</em><br/>Stay for the feeling.</h2>
          <div className="line"/>
          <p>
            Warm coffee, fresh food, and a relaxed atmosphere come together to create a place where you can slow down, enjoy the moment, and stay a little longer.
          </p>
          <div className="room-gallery">
            <img src={images.owner} alt="Pleno Café atmosphere" />
            <img src={images.two} alt="Coffee and pastry" />
            <img src={images.five} alt="Coffee and pastry" />
          </div>
          <div className="stats"><span><b>4.8</b><small>GOOGLE RATING</small></span><span><b>08:00</b><small>OPENS MON–FRI*</small></span></div>
        </div>
      </section>

      <section className="review-section">
        <Reveal>
          <p className="section-kicker">05 / WORD OF MOUTH</p>
          <div className="word-grid">
            <div>
              <div className="quote-mark">“</div>
              <blockquote>A good café is not only somewhere you drink coffee. It is somewhere you remember being.</blockquote>
            </div>
            <div className="social-wall">
              <img src={images.coffee} alt="Coffee detail" />
              <img src={images.pastry} alt="Pastry and coffee" />
              <div className="social-copy">
                <a href="https://www.instagram.com/pleno_cafe/" target="_blank" >
                  <Instagram size={18}/>
                  <span> PLENO CAFÉ / MOMENTS</span>
                </a>
              </div>
            </div>
          </div>
          <div className="review-meta"><span>PLENO CAFÉ · SÃO PAULO</span></div>
        </Reveal>
      </section>

      <section className="visit" id="visit">
        <a className="visit-map" href="https://www.google.com/maps/place/?q=place_id:ChIJwanjXNdXzpQR53VbY0r0W30" target="_blank" rel="noreferrer" aria-label="Open Pleno Café on Google Maps">
          <div className="map-grid"/>
          <div className="pin"><MapPin size={20}/><span>PLENO CAFÉ</span></div>
          <div className="map-label one">SÃO PAULO</div>
          <div className="map-label two">VILA PROGREDIOR</div>
          <span className="map-hint">CLICK TO OPEN PLENO CAFÉ IN MAPS ↗</span>
        </a>
        <div className="visit-copy">
          <p className="section-kicker">06 / FIND US</p>
          <h2>See you<br/><em>there.</em></h2>
          <p className="address">Av. Prof. Francisco Morato, 2585<br/>Vila Progredior, São Paulo — SP<br/>05513-300, Brazil</p>
          <div className="hours"><Clock3 size={17}/><span>Mon–Fri 08:00–19:00 · Sat 08:00–17:00</span></div>
          <a className="directions" href="https://www.google.com/maps/place/?q=place_id:ChIJwanjXNdXzpQR53VbY0r0W30" target="_blank" rel="noreferrer">Open Pleno Café in Maps <ArrowUpRight size={17}/></a>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div className="brand">
            <img
              src="/logo.jpg"
              alt="Pleno Café logo"
              className="brand-logo"
            />

            <span className="brand-name">
              PLENO<br />
              <i>Café & Bistrô</i>
            </span>
          </div>
          <p>COFFEE / FOOD / GOOD COMPANY<br/></p>
          <a href="#top" onClick={(e)=>{e.preventDefault();go("top")}}>Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 PLENO - Café & Bistrô</span>
          
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
