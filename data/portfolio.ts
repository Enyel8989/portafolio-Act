export const profile = {
  name: "Ángel Lemuel López Ortíz",
  email: "",
  github: "https://github.com/Enyel8989",
};

type Evidence = { label: string; href: string; download?: boolean };
type Figure = { src: string; caption: string; alt: string; width: number; height: number };
type Project = {
  slug: string;
  title: string;
  area: string;
  summary: string;
  problem: string;
  goal: string;
  tools: string[];
  method: string;
  result: string;
  pending?: string;
  evidence?: Evidence[];
  figures?: Figure[];
};

export const projects: Project[] = [
  {
    slug: "regresion-lineal",
    title: "Regresión lineal",
    area: "Semana 3 · Modelado",
    summary: "Explorar cómo una recta puede representar la relación entre variables.",
    problem: "Entender cómo cambia una variable cuando cambia otra.",
    goal: "Ajustar un modelo lineal e interpretar sus predicciones con una gráfica.",
    tools: ["Regresión lineal"],
    method: "La regresión lineal ajusta una recta a los pares de datos para estimar la variable de salida. La gráfica permite comparar los datos observados con el ajuste.",
    result: "Pendiente de verificar con el ejercicio original.",
    pending: "Código o notebook, gráfica del ajuste y captura del funcionamiento.",
  },
  {
    slug: "laberinto",
    title: "Laberinto",
    area: "Semana 4 · Decisiones",
    summary: "Representar las decisiones que permiten avanzar por un laberinto.",
    problem: "Elegir un movimiento cuando existen caminos, obstáculos y posibles callejones.",
    goal: "Resolver el recorrido y explicar cómo se toman las decisiones.",
    tools: ["Python", "Tkinter", "SQLite", "Búsqueda en profundidad"],
    method: "El programa genera un tablero aleatorio de 21 × 15 y abre cinco paredes para añadir conexiones. Desde la casilla inicial explora cada movimiento válido sin repetir casillas en la misma ruta. Cuando llega a la meta, guarda el camino y luego retrocede para probar otras ramas. Al final ordena las rutas por longitud. Se juega con las flechas, N muestra las rutas, R reinicia y T abre el ranking.",
    result: "En el tablero de ejemplo se encontraron 24 rutas sin repetir casillas. La más corta requirió 60 movimientos. Al llegar a la meta, el juego compara los movimientos realizados con el mínimo y guarda la eficiencia en SQLite. Una partida por la ruta más corta obtiene 100 %.",
    evidence: [
      { label: "Descargar código del laberinto (.py)", href: "/evidencias/laberinto/laberinto.py", download: true },
    ],
    figures: [
      { src: "/evidencias/laberinto/ruta-mas-corta.png", caption: "Tablero generado por el código. La línea celeste muestra una ruta mínima de 60 movimientos.", alt: "Laberinto con la ruta más corta en celeste, la salida en amarillo y la meta en verde.", width: 588, height: 420 },
    ],
  },
  {
    slug: "ai-challenge",
    title: "AI Challenge",
    area: "Machine Learning · Agrupación y clasificación",
    summary: "Comparar dos maneras de analizar datos con K-Means y KNN.",
    problem: "Reconocer patrones en datos y decidir cómo clasificar una observación nueva.",
    goal: "Explicar la diferencia entre agrupar sin etiquetas y clasificar con ejemplos etiquetados.",
    tools: ["Python", "NumPy", "pandas", "Matplotlib", "scikit-learn", "K-Means", "KNN"],
    method: "El notebook genera datos simulados de 500 estudiantes. K-Means compara tres y cuatro grupos usando horas de estudio, asistencia, tareas y nota. KNN usa horas, asistencia y tareas para predecir si un estudiante aprueba. El notebook separa el 25 % de los datos para comparar siete valores de k, con y sin estandarización.",
    result: "Con estandarización, la mayor exactitud registrada fue 81.6 % con k = 15. Sin estandarización, k = 3 y k = 15 alcanzaron 82.4 %. El modelo estandarizado con k = 15 clasificó como reprobado al ejemplo de 4 horas de estudio, 55 % de asistencia y 50 % en tareas. Los resultados corresponden a datos simulados y al conjunto usado para comparar los valores de k.",
    evidence: [
      { label: "Descargar notebook con código y resultados (.ipynb)", href: "/evidencias/ai-challenge/ai-challenge.ipynb", download: true },
    ],
    figures: [
      { src: "/evidencias/ai-challenge/kmeans-3-grupos.png", caption: "K-Means con tres grupos. La gráfica muestra horas y nota, dos de las cuatro variables del modelo.", alt: "Gráfica de horas de estudio y nota con tres colores de K-Means.", width: 686, height: 470 },
      { src: "/evidencias/ai-challenge/kmeans-4-grupos.png", caption: "K-Means con cuatro grupos sobre las mismas observaciones.", alt: "Gráfica de horas de estudio y nota con cuatro colores de K-Means.", width: 686, height: 470 },
    ],
  },
  {
    slug: "hotspots",
    title: "Hotspots comerciales",
    area: "Machine Learning · Datos geográficos",
    summary: "Analizar la distribución de cines en la zona oriental de El Salvador.",
    problem: "Describir dónde se ubican los cines registrados en San Miguel, Usulután, Morazán y La Unión.",
    goal: "Construir un prototipo que agrupe coordenadas y clasifique un punto de prueba por cercanía.",
    tools: ["Python", "OpenStreetMap", "Overpass Turbo", "K-Means", "KNN", "Folium"],
    method: "El equipo recopiló registros de OpenStreetMap con Overpass Turbo, agrupó las coordenadas con K-Means, clasificó un punto con KNN de un vecino y representó los puntos con Folium.",
    result: "El CSV contiene dos cines: Centenario en Usulután y Cinemark en San Miguel. K-Means formó un grupo por cine. KNN asignó Usulután al punto de prueba (13.350000, −88.430000) por cercanía a Centenario. La muestra permite ilustrar los dos algoritmos y es insuficiente para identificar concentraciones comerciales.",
    evidence: [
      { label: "Abrir mapa de cines", href: "/evidencias/hotspots/mapa_cines_oriente.html" },
      { label: "Abrir mapa de resultados de K-Means y KNN", href: "/evidencias/hotspots/mapa_resultados_ml.html" },
      { label: "Descargar código del análisis (.py)", href: "/evidencias/hotspots/analisis_cines.py", download: true },
      { label: "Descargar datos de los cines (.csv)", href: "/evidencias/hotspots/cines_oriente_el_salvador.csv", download: true },
      { label: "Descargar informe académico (.docx)", href: "/evidencias/Informe_Hotspots_El_Salvador.docx", download: true },
    ],
  },
  {
    slug: "portafolio",
    title: "Portafolio y API de contacto",
    area: "Desarrollo web · Frontend y backend",
    summary: "Organizar el trabajo del curso en un sitio responsive con un formulario conectado a una API REST.",
    problem: "Reunir el perfil, los proyectos y sus evidencias en un lugar que se pueda navegar y compartir.",
    goal: "Construir páginas reutilizables con Next.js y procesar mensajes con un endpoint propio.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    method: "La carpeta app define el inicio, las fichas y la ruta POST /api/contact. El componente ContactForm envía JSON mediante fetch. La API valida nombre, correo y mensaje. Con Resend configurado, envía el mensaje al correo definido en el servidor.",
    result: "El sitio reúne siete secciones y mantiene una ficha independiente por proyecto. El formulario informa si el servidor aceptó el mensaje o devolvió un error.",
    figures: [
      { src: "/evidencias/captura-portafolio.png", caption: "Captura de la página de inicio.", alt: "Inicio del portafolio en una computadora.", width: 1440, height: 1000 },
    ],
  },
];
