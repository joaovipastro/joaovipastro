export default {
  lang: 'es',
  title: 'Mise en Place',
  subtitle: 'El Cuaderno de Trabajo',
  tagline: 'Un método de planificación para quienes viven varias vidas a la vez',
  owner: 'Este cuaderno pertenece a',
  started: 'Empecé el',
  contents: 'Índice',
  module: 'Módulo',
  idea: 'La idea',
  keys: 'Para recordar',
  exercise: 'Ejercicio',
  practice: 'Práctica de la semana',
  tools: 'Herramientas',
  toolsIntro: 'Copia estas páginas tantas veces como necesites. Son las piezas que hacen funcionar el método.',
  scaleLow: 'casi nunca',
  scaleHigh: 'casi siempre',
  intro: {
    title: 'Antes de empezar',
    body: [
      'Toda buena cocina empieza igual. Antes del servicio, el cocinero deja listo todo lo que la noche va a pedir: cuchillos afilados, salsas reducidas, la estación limpia. Cuando llega el momento de más presión, no piensa en logística. Piensa en el plato.',
      'Este cuaderno lleva esa disciplina a la vida profesional. Se apoya en tres preguntas, que se hacen antes de cualquier acción: <b>Resultado</b> — ¿qué quiero realmente? <b>Razón</b> — ¿por qué me importa? <b>Ruta</b> — ¿cuál es el camino más sencillo para llegar?',
      'Escribe en él. Los ejercicios son breves a propósito, y es al escribir cuando ocurre el cambio. Un módulo por semana es el ritmo adecuado para la mayoría de las personas.',
    ],
  },
  modules: [
    {
      n: 0, title: 'Orientación',
      idea: 'Conoce tu punto de partida.',
      body: ['Responde rápido. Aquí el primer instinto vale más que la respuesta meditada. Volverás a puntuarte al final del Módulo 7.'],
      exercises: [
        { title: 'Tu punto de partida', intro: 'Puntúa cada frase del 1 (casi nunca es cierto) al 5 (casi siempre es cierto).', fields: [
          { t: 'scale', items: [
            'Al empezar la mayoría de los días, sé cuáles son las tres cosas que más importan.',
            'Al terminar la mayoría de las semanas, siento que hice avanzar algo importante.',
            'Mi agenda refleja lo que digo que son mis prioridades.',
            'Dedico la mayor parte de mi jornada a trabajo que solo yo puedo hacer.',
            'Tengo tiempo habitual para las personas y las cosas que me recargan.',
            'Cuando mis planes se desmoronan, sé rehacerlos rápido.',
            'Sé por qué mis objetivos principales de ahora me importan de verdad.',
          ] },
          { t: 'lines', label: 'Total (sobre 35)', n: 1 },
        ] },
        { title: 'Completa las frases', fields: [
          { t: 'lines', label: 'La parte de mi vida que recibe menos atención intencional es…', n: 2 },
          { t: 'lines', label: 'Lo que siempre digo que voy a hacer es…', n: 2 },
          { t: 'lines', label: 'Doy lo mejor de mí cuando…', n: 2 },
          { t: 'lines', label: 'Mi motivo concreto para hacer este curso es…', n: 2 },
        ] },
      ],
      practice: 'Durante tres días, fíjate en los momentos en que te sientes ocupado, pero no útil. Apunta una palabra cada vez.',
    },
    {
      n: 1, title: 'Planificar es Diseñar',
      idea: 'Un plan no es una lista de lo que vas a hacer. Es una decisión sobre qué tipo de vida estás construyendo.',
      body: [
        'Casi toda la planificación te mantiene organizado dentro de la vida que ya tienes. Diseñar empieza en otro sitio: en la experiencia que quieres crear, y desde ahí hacia atrás, hasta los detalles que la harán posible.',
        'Por eso cada sesión de planificación empieza con otra pregunta. No «¿qué tengo que hacer?», sino «¿qué quiero que sea verdad?».',
      ],
      keys: ['Estar ocupado no es lo mismo que avanzar.', 'Los «debería» casi nunca ocurren. El cambio empieza cuando un estándar deja de ser aceptable: cuando el «debería» se convierte en «tengo que».', 'Pon nombre propio a las áreas de tu vida. Los nombres que suenan a ti retienen tu atención.'],
      exercises: [
        { title: 'La lista larga', intro: 'Doce minutos, sin parar. Todo lo que te gustaría ser, hacer, tener, aprender, vivir o aportar. Después, junto a cada cosa, un plazo: 1, 3, 5, 10 o 20 años. Rodea los cuatro o cinco objetivos a un año que más te ilusionen.', fields: [{ t: 'lines', n: 14 }] },
        { title: 'Tu Mapa de Vida', intro: 'De cinco a siete áreas. Escribe la visión en presente, como si ya fuera cierta.', fields: [{ t: 'table', cols: ['Área', 'Visión', 'Estándar actual', 'Mi papel en mi mejor versión', 'Nota /10'], rows: 7, tall: true }] },
        { title: 'La distancia', fields: [
          { t: 'lines', label: '¿Qué área, si mejorara dos puntos, elevaría todas las demás? (Esta es tu área guía.)', n: 2 },
          { t: 'lines', label: '¿Qué área he ido descuidando en silencio porque otra hace más ruido?', n: 2 },
          { t: 'lines', label: '¿Qué estándar actual ya no me resulta aceptable?', n: 2 },
        ] },
      ],
      practice: 'Lee tu Mapa de Vida cada mañana, antes de abrir ningún mensaje. Noventa segundos.',
    },
    {
      n: 2, title: 'Por qué Fallan las Listas',
      idea: 'Una lista te dice qué hacer. No te dice por qué, y por eso no puede decirte qué importa.',
      body: [
        'Las listas guardan tareas, no resultados. Crecen más rápido de lo que puedes vaciarlas, premian a quien pidió lo último y no ofrecen ningún motivo para actuar hoy en lugar de la semana que viene.',
        'El tiempo, además, se siente, no solo se mide. Una hora de claridad y una hora de ansiedad duran lo mismo en el reloj y muy distinto en la vida. La claridad crea tiempo.',
      ],
      keys: ['La saturación es una señal de que intentas resolverlo todo a la vez. La salida es elegir.', '«No tengo tiempo» suele ser un estado, no un hecho. Prueba con «ahora mismo no es una prioridad».', 'La forma más rápida de hacer más es hacer menos. Decide de antemano lo que no vas a hacer.'],
      exercises: [
        { title: 'Autopsia de la lista', intro: 'Marca cada elemento de tu lista actual: R (hace avanzar una visión), M (mantenimiento), O (prioridad de otra persona), ? (ya no recuerdo por qué está).', fields: [{ t: 'table', cols: ['R', 'M', 'O', '?', 'Total'], rows: 1 }] },
        { title: 'Registro de reactividad — cinco noches', fields: [{ t: 'table', cols: ['Día', 'Lo más importante que avancé', 'Tiempo que no tenía por qué ser mío', 'Cuándo me sentí al mando'], rows: 5, tall: true }, { t: 'lines', label: 'Tres patrones que observo', n: 3 }] },
        { title: 'Tu lista de lo que no harás', intro: 'Al menos siete cosas que has decidido dejar de hacer.', fields: [{ t: 'list', n: 7 }] },
      ],
      practice: 'Cada mañana, antes de mirar tu lista, escribe: «Hoy será un buen día si…». Haz primero lo que corresponda.',
    },
    {
      n: 3, title: 'Las Tres Preguntas',
      idea: 'Decide qué quieres y por qué antes de decidir qué hacer. El plan se vuelve más corto, más claro y más fácil de seguir.',
      body: [
        'El <b>Resultado</b> es un desenlace, no una actividad: algo que se puede ver y comprobar que está hecho. La <b>Razón</b> es el combustible: personal, emocional y escrita en más de una capa. La <b>Ruta</b> es la lista breve de acciones, con las pocas esenciales marcadas como imprescindibles.',
        'Una Razón completa mira los dos lados: lo que ganas si lo haces y lo que te cuesta si todo sigue igual. Empieza por lo que quieres; usa el coste como empujón cuando las ganas no basten.',
      ],
      keys: ['Cinco pruebas de un Resultado: ¿es un desenlace, es concreto, depende de ti, tiene el tamaño adecuado… y tira de ti?', 'Si solo pudieras hacer dos acciones de la Ruta, ¿cuáles serían?', 'Antes de cada reunión, acordad primero el resultado.'],
      exercises: [
        { title: 'Un plan completo', intro: 'Escribe uno para tu área guía. Copia esta página para un plan de trabajo y otro personal.', fields: [
          { t: 'lines', label: 'Resultado', n: 2 },
          { t: 'lines', label: 'Lo que gano', n: 3 },
          { t: 'lines', label: 'Lo que me cuesta no hacerlo', n: 2 },
          { t: 'lines', label: 'A cuáles de mis valores responde', n: 1 },
          { t: 'table', cols: ['Acción', 'Esencial', 'Tiempo', 'Quién', 'Cuándo'], rows: 7 },
        ] },
        { title: 'Traducir tareas', intro: 'Toma diez elementos de tu lista. Pregunta «¿a qué resultado sirve esto?» hasta llegar a algo que importe… o a nada.', fields: [{ t: 'table', cols: ['Tarea', 'El resultado que hay detrás', 'Mantener / Mantenimiento / Borrar'], rows: 10 }] },
      ],
      practice: 'Antes de cualquier bloque de trabajo de más de 30 minutos, escribe en el margen: Resultado, Razón, Ruta. Una línea cada una.',
    },
    {
      n: 4, title: 'De la Captura al Compromiso',
      idea: 'Una vez por semana, vacía la cabeza, agrupa todo según el resultado al que sirve y comprométete con lo esencial.',
      body: [
        'La Mise en Place Semanal dura sesenta minutos y tiene cinco etapas: capturar, agrupar, planificar, comprometerse y preparar. Si solo conservas un hábito de este curso, que sea este.',
        'Antes de agrupar, decide una sola vez sobre cada elemento: descartar, delegar, hacer (si lleva menos de dos minutos), fechar, archivar o impedir que vuelva. Un tercio de casi todas las listas desaparece aquí.',
      ],
      keys: ['Dedica a lo esencial tus mejores horas, antes del correo.', 'Protege cada día al menos una tarea importante y no urgente. Ahí se construye el futuro.', 'Un «no» claro y amable genera más confianza que un «sí» que no puedes cumplir.'],
      exercises: [
        { title: 'Tu primera sesión semanal', intro: 'Usa la herramienta Mise en Place Semanal, al final del cuaderno. Después, reflexiona.', fields: [
          { t: 'table', cols: ['Elementos capturados', 'Grupos formados', 'Horas esenciales antes del recorte', 'Después del recorte'], rows: 1 },
          { t: 'lines', label: 'Cómo me sentí al principio… y al final', n: 3 },
        ] },
        { title: 'Triaje', intro: 'P1: consecuencias serias si no es hoy. P2: mucho valor, sin urgencia. P3: alguien se decepcionará algún día. P4: no importa.', fields: [{ t: 'table', cols: ['P1', 'P2', 'P3', 'P4'], rows: 5 }] },
        { title: 'Un «no» que tengo que decir', fields: [{ t: 'lines', label: 'La petición', n: 1 }, { t: 'lines', label: 'Lo que diré: amable, claro, en menos de sesenta palabras', n: 3 }] },
      ],
      practice: 'Rellena la Tarjeta del Día cada mañana, antes de abrir el correo. Protege un bloque de tiempo esencial cada día laborable.',
    },
    {
      n: 5, title: 'Apalancamiento',
      idea: 'Tu tiempo debe ir donde solo tú aportas valor. Lo demás se puede eliminar, simplificar, sistematizar, delegar… o aprender de quien ya lo ha hecho.',
      body: [
        'Cada hora dedicada a un trabajo que podría hacer otra persona es una hora menos para las relaciones, las decisiones y los estándares que solo tú puedes aportar.',
        'Empieza con un mapa 80/20: ¿qué pocos clientes, productos o actividades generan la mayor parte de tus resultados, y cuáles se llevan la mayor parte de tu tiempo? El apalancamiento se esconde en los desajustes.',
      ],
      keys: ['Delega un Resultado con su Razón, no una tarea.', 'Una buena delegación tiene cinco partes: resultado, razón, límites, recursos y seguimiento.', 'Decide por escrito qué harás con las horas que liberes, o volverán a llenarse solas.'],
      exercises: [
        { title: 'Tu mapa 80/20', fields: [{ t: 'grid', cols: ['Aporta mucho', 'Aporta poco'], rows: ['Me lleva mucho tiempo', 'Me lleva poco tiempo'] }] },
        { title: 'Tu Libro de Apalancamiento', intro: 'Cinco elementos en los que una palanca liberaría más tiempo o energía.', fields: [{ t: 'table', cols: ['Actividad', 'H/sem', 'Palanca', 'Primer paso', 'Para cuándo', 'H liberadas'], rows: 5 }, { t: 'lines', label: 'Qué haré con las horas liberadas', n: 2 }] },
        { title: 'Una delegación bien hecha', fields: [
          { t: 'lines', label: 'Resultado: cómo es «bien hecho»', n: 2 },
          { t: 'lines', label: 'Razón: por qué importa', n: 2 },
          { t: 'lines', label: 'Límites: presupuesto, plazo, qué decide la persona por su cuenta', n: 2 },
          { t: 'lines', label: 'Recursos: plantillas, contactos, ejemplos', n: 1 },
          { t: 'lines', label: 'Seguimiento: fecha y qué revisaremos', n: 1 },
        ] },
      ],
      practice: 'Cada vez que empieces una tarea, pregúntate: «¿Esto solo puedo hacerlo yo?». Si no, anótalo en el Libro.',
    },
    {
      n: 6, title: 'Tiempo, Foco y Estado',
      idea: 'Tu agenda muestra lo que de verdad priorizas. Tu estado decide lo bien que ejecutas. Diseña ambos a propósito.',
      body: [
        'Los objetivos de tiempo invierten el orden habitual: decide cuánto de cada semana merece cada área de tu vida y reserva primero esos mínimos.',
        'Tu estado es un activo de trabajo. Primero, el sueño, la comida y el movimiento. Después, tres palancas: el cuerpo, las preguntas que te haces y la respiración.',
      ],
      keys: ['Trabaja en una sola cosa, en rondas de 45 minutos. Ten una lista de tareas de diez minutos para los huecos.', 'Cuando algo sale mal, pregúntate: ¿qué tiene de útil? ¿qué no está bien todavía? ¿qué voy a hacer… y a dejar de hacer? ¿cómo puedo disfrutar arreglándolo?', 'Respiración del corazón, dos minutos: atención en el pecho, cinco segundos al inspirar, cinco al espirar, una gratitud sentida de verdad. Diez respiraciones.'],
      exercises: [
        { title: 'Objetivos de tiempo', fields: [{ t: 'table', cols: ['Área', 'Mínimo / semana', 'Ideal / semana', 'En qué momento'], rows: 7 }] },
        { title: 'Tu Menú de Recarga', intro: 'Las pequeñas cosas que, sin falta, te devuelven a tu mejor versión.', fields: [
          { t: 'lines', label: 'Entrantes · de 1 a 5 minutos', n: 5 },
          { t: 'lines', label: 'Platos principales · de 15 a 60 minutos', n: 3 },
          { t: 'lines', label: 'Menús degustación · medio día o más', n: 2 },
        ] },
        { title: 'Mi jornada ideal', fields: [{ t: 'table', cols: ['Hora', 'Qué ocurre'], rows: 10 }] },
      ],
      practice: 'Vive cinco días según tus objetivos de tiempo. Usa un entrante antes de cada bloque esencial.',
    },
    {
      n: 7, title: 'El Juego Largo',
      idea: 'Un sistema vale lo que valen los rituales que lo mantienen vivo. Crea pocos, mantenlos sencillos y úsalos durante años.',
      body: [
        'Escribe tus propias reglas para ganar: reglas que puedas cumplir a menudo, que hagan fácil sentirte bien y difícil sentirte mal. Después, mantén el ritmo: una tarjeta al día, una hora a la semana, una revisión al trimestre.',
        'Cada mañana, ensaya. Imagina los tres Resultados del día bien hechos, y a ti en tu mejor versión dentro de ellos. Siéntelo antes de que ocurra y llévalo contigo a la primera tarea esencial.',
      ],
      keys: ['Cuando te desvíes, no empieces de cero con un sistema nuevo. Haz la puesta a punto de 20 minutos: capturar, elegir tres, una tarea esencial.', 'Cuando el problema sea tu estado, haz el reto de diez días: no darle vueltas, soluciones primero, volver a empezar si recaes.'],
      exercises: [
        { title: 'Mis reglas para ganar', fields: [{ t: 'list', n: 6, prefix: 'Gano cuando…' }] },
        { title: 'Mis valores, en orden', fields: [{ t: 'table', cols: ['Estados que más quiero sentir', 'Estados que más quiero evitar'], rows: 6 }] },
        { title: 'Tu punto de partida, otra vez', intro: 'Vuelve al Módulo 0 y puntúa de nuevo las siete frases.', fields: [
          { t: 'table', cols: ['Nota entonces', 'Nota ahora'], rows: 1 },
          { t: 'lines', label: 'Lo que más ha cambiado', n: 2 },
          { t: 'lines', label: 'La parte del método que más me costará mantener', n: 2 },
        ] },
      ],
      practice: 'Reserva ahora el ritmo: 13 sesiones semanales, tres revisiones mensuales y tu primera Revisión Trimestral.',
    },
  ],
  toolPages: [
    { title: 'Mise en Place Semanal', sub: 'Sesenta minutos, siempre a la misma hora.', fields: [
      { t: 'lines', label: '1 · Capturar: todo lo que tengo en la cabeza (10 min)', n: 8 },
      { t: 'lines', label: '2 · Decidir y agrupar: descartar, delegar, hacer, fechar, archivar, impedir (10 min)', n: 3 },
      { t: 'table', cols: ['Resultado de la semana', 'Razón', 'Esenciales', 'Horas'], rows: 5 },
      { t: 'table', cols: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], rows: 1, label: '4 · Bloques esenciales reservados' },
      { t: 'check', items: ['Lo esencial cabe en el tiempo que de verdad tengo', 'Objetivos de tiempo revisados', 'Una recarga reservada', 'Tarjeta de mañana rellenada'] },
    ] },
    { title: 'Tarjeta del Día', sub: 'Diez minutos por la mañana. Dos por la noche.', fields: [
      { t: 'lines', label: 'Preguntas de la mañana: agradezco · me ilusiona · me enorgullece · a quién quiero · con qué me comprometo', n: 3 },
      { t: 'lines', label: 'Hoy será un buen día si…', n: 1 },
      { t: 'table', cols: ['Resultado', 'Esenciales, en orden', 'P1–P4', 'Hecho'], rows: 3 },
      { t: 'lines', label: 'Bloque protegido · horas de mensajes · si el día se tuerce, renuncio a', n: 2 },
      { t: 'lines', label: 'Noche: qué aporté · qué aprendí · un logro · primera acción de mañana', n: 4 },
    ] },
    { title: 'Revisión Trimestral', sub: 'De dos a tres horas, cada trece semanas.', fields: [
      { t: 'lines', label: 'Celebrar: todo lo que salió bien', n: 4 },
      { t: 'table', cols: ['Lo que no salió según lo previsto', 'Lo que me enseñó'], rows: 3 },
      { t: 'table', cols: ['Área', 'Nota entonces', 'Nota ahora', 'Resultado del próximo trimestre'], rows: 7 },
      { t: 'check', items: ['Objetivos de tiempo ajustados', 'Libro de Apalancamiento revisado', 'Menú de Recarga actualizado', 'Las reglas para ganar siguen valiendo', 'Próxima revisión reservada'] },
      { t: 'lines', label: 'Una frase para el próximo trimestre', n: 1 },
    ] },
  ],
  closing: 'El método es sencillo a propósito. Lo que lo hace funcionar es lo mismo que hace funcionar un gran hotel o una gran cafetería: constancia en los detalles, con cuidado, hasta que se convierte simplemente en la forma de hacer las cosas. Prepara tu estación. Después, cocina.',
};
