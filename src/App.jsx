import { useEffect, useMemo, useRef, useState } from "react";

const EXPERIENCES = [
  {
    id: "item",
    title: "Tarifario por item",
    description:
      "Vista operativa centrada en el detalle granular por item, conservando la logica original del HTML autonomo.",
    path: "/tarifarios/item.html",
  },
  {
    id: "modulo",
    title: "Tarifario por modulo",
    description:
      "Vista agrupada por modulo, publicada como documento autonomo y encapsulada dentro del contenedor React.",
    path: "/tarifarios/modulo.html",
  },
];

function getInitialExperience() {
  if (typeof window === "undefined") {
    return EXPERIENCES[0].id;
  }

  const hashId = window.location.hash.replace("#", "");
  return EXPERIENCES.some((experience) => experience.id === hashId)
    ? hashId
    : EXPERIENCES[0].id;
}

function getDocumentHeight(doc) {
  const body = doc.body;
  const html = doc.documentElement;

  return Math.max(
    body?.scrollHeight ?? 0,
    body?.offsetHeight ?? 0,
    html?.clientHeight ?? 0,
    html?.scrollHeight ?? 0,
    html?.offsetHeight ?? 0,
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(getInitialExperience);
  const iframeRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const activeExperience = useMemo(
    () =>
      EXPERIENCES.find((experience) => experience.id === activeId) ?? EXPERIENCES[0],
    [activeId],
  );

  useEffect(() => {
    const handleHashChange = () => {
      const nextId = getInitialExperience();
      setActiveId((currentId) => (currentId === nextId ? currentId : nextId));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const nextHash = `#${activeId}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [activeId]);

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    resizeObserverRef.current?.disconnect();
  }, [activeExperience.path]);

  const handleFrameLoad = () => {
    const frame = iframeRef.current;
    if (!frame) {
      return;
    }

    resizeObserverRef.current?.disconnect();

    try {
      const doc = frame.contentDocument;
      const frameWindow = frame.contentWindow;
      if (!doc || !frameWindow) {
        frame.style.minHeight = "70vh";
        return;
      }

      const syncFrameHeight = () => {
        const nextHeight = Math.max(getDocumentHeight(doc), window.innerHeight * 0.72);
        frame.style.height = `${Math.ceil(nextHeight)}px`;
      };

      syncFrameHeight();

      window.addEventListener("resize", syncFrameHeight);
      frameWindow.addEventListener("resize", syncFrameHeight);

      if (typeof ResizeObserver === "function") {
        const resizeObserver = new ResizeObserver(syncFrameHeight);
        resizeObserver.observe(doc.documentElement);
        if (doc.body) {
          resizeObserver.observe(doc.body);
        }

        resizeObserverRef.current = {
          disconnect() {
            resizeObserver.disconnect();
            frameWindow.removeEventListener("resize", syncFrameHeight);
            window.removeEventListener("resize", syncFrameHeight);
          },
        };
        return;
      }

      resizeObserverRef.current = {
        disconnect() {
          frameWindow.removeEventListener("resize", syncFrameHeight);
          window.removeEventListener("resize", syncFrameHeight);
        },
      };
    } catch {
      frame.style.minHeight = "70vh";
    }
  };

  return (
    <div className="shell">
      <div className="shell__glow shell__glow--left" aria-hidden="true" />
      <div className="shell__glow shell__glow--right" aria-hidden="true" />

      <header className="hero">
        <p className="eyebrow">ONUS Express</p>
        <div className="hero__content">
          <div>
            <h1>Super Tarifario V3</h1>
            <p className="hero__lead">
              Contenedor React + Vite reconstruido para preservar las dos versiones
              funcionales autonomas y dejar el proyecto listo para Git y Vercel.
            </p>
          </div>
          <div className="hero__actions">
            <a className="button button--ghost" href={activeExperience.path} target="_blank" rel="noreferrer">
              Abrir actual
            </a>
            <a
              className="button button--primary"
              href="https://vercel.com/new"
              target="_blank"
              rel="noreferrer"
            >
              Crear deploy en Vercel
            </a>
          </div>
        </div>
      </header>

      <main className="layout">
        <aside className="panel panel--sidebar">
          <section className="card">
            <p className="card__label">Auditoria</p>
            <ul className="status-list">
              <li>El `src` original no existia: estaba perdida la fuente React.</li>
              <li>Los dos HTML autonomos siguen siendo la base funcional valida.</li>
              <li>La version React actual encapsula y publica ambas vistas.</li>
              <li>La interfaz es mobile-first y evita scroll anidado cuando es posible.</li>
            </ul>
          </section>

          <section className="card">
            <p className="card__label">Modos disponibles</p>
            <div className="switcher" role="tablist" aria-label="Seleccion de tarifario">
              {EXPERIENCES.map((experience) => (
                <button
                  key={experience.id}
                  type="button"
                  role="tab"
                  aria-selected={activeId === experience.id}
                  className={`switcher__button ${
                    activeId === experience.id ? "switcher__button--active" : ""
                  }`}
                  onClick={() => setActiveId(experience.id)}
                >
                  <span>{experience.title}</span>
                  <small>{experience.id === "item" ? "Detalle" : "Agrupado"}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="card card--compact">
            <p className="card__label">Vista actual</p>
            <h2>{activeExperience.title}</h2>
            <p className="card__text">{activeExperience.description}</p>
            <a className="text-link" href={activeExperience.path} target="_blank" rel="noreferrer">
              Abrir documento autonomo en pantalla completa
            </a>
          </section>
        </aside>

        <section className="panel panel--viewer">
          <div className="viewer__header">
            <div>
              <p className="card__label">Contenedor React</p>
              <h2>{activeExperience.title}</h2>
            </div>
            <span className="viewer__badge">HTML autonomo protegido</span>
          </div>

          <div className="frame-wrap">
            <iframe
              key={activeExperience.id}
              ref={iframeRef}
              title={activeExperience.title}
              src={activeExperience.path}
              className="viewer__frame"
              onLoad={handleFrameLoad}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
