const beep = document.getElementById('beep');
const heartbeat = document.getElementById('heartbeat');
const kiss = document.getElementById('kiss');
const softmusic = document.getElementById('softmusic');

const textElement = document.getElementById('text');
const choicesElement = document.getElementById('choices');

const scenes = {
  start: {
    text: "Una paciente llega sin poder recordar su nombre. Es alta, de cabello castaño y lentes. Se ve débil, pero hermosa. Jael, la enfermera de turno, se acerca con suavidad a la habitación.",
    sound: "beep",
    choices: [
      { text: "Presentarse con formalidad.", next: "formal" },
      { text: "Presentarse con una sonrisa cálida.", next: "calida" },
      { text: "Decirle una frase simpática para romper el hielo.", next: "rompehielo" }
    ]
  },
  formal: {
    text: "La paciente parpadea un par de veces. '¿Nos conocemos? Me resultas familiar...', murmura. Su mirada se torna más suave.",
    choices: [
      { text: "Decirle que tal vez se conocieron en otra vida.", next: "reconocer" },
      { text: "Decirle que es su primera vez viéndola.", next: "signos1" },
      { text: "Sonreírle sin responder.", next: "signos1" }
    ]
  },
  reconocer: {
    text: "'Otra vida...', repite, como saboreando las palabras. 'Puede ser... aunque esta ya se siente como un sueño extraño.'",
    choices: [
      { text: "Tomarle la mano suavemente.", next: "reaccion_roce" },
      { text: "Preguntar cómo se siente.", next: "emocional" },
      { text: "Volver a la rutina profesional.", next: "signos1" }
    ]
  },
  calida: {
    text: "La paciente sonríe levemente al verte. Dice: '¿Eres mi enfermera? Qué suerte tengo...'",
    choices: [
      { text: "Sonreírle de vuelta.", next: "reaccion_sonrisa" },
      { text: "Hacer contacto visual prolongado.", next: "mirada_intensa" },
      { text: "Desviar la mirada por profesionalismo.", next: "signos1" }
    ]
  },
  rompehielo: {
    text: "'¿Sabes? No todos los días atiendo a pacientes tan misteriosas como tú', dice Jael con una sonrisa. Alexandra ríe levemente.",
    choices: [
      { text: "Ofrecer tomarle los signos vitales.", next: "signos1" },
      { text: "Preguntar si recuerda algo.", next: "nombre" },
      { text: "Preguntar cómo se siente emocionalmente.", next: "emocional" }
    ]
  },
  signos1: {
    text: "Jael comienza la revisión médica. Sus manos se mueven con precisión y cuidado.",
    sound: "heartbeat",
    choices: [
      { text: "Rozarle la mano al ponerle el tensiómetro.", next: "reaccion_roce" },
      { text: "Sonreírle brevemente mientras mide la presión.", next: "reaccion_sonrisa" },
      { text: "Hacerlo con total profesionalismo.", next: "reaccion_prof" }
    ]
  },
  emocional: {
    text: "'Me siento sola... pero hay algo en ti que me hace sentir menos perdida', dice con voz frágil.",
    choices: [
      { text: "Mirarla con ternura.", next: "nombre" },
      { text: "Tomarle la mano.", next: "intensifica" },
      { text: "Evitar responder emocionalmente.", next: "fin_frio" }
    ]
  },
  reaccion_roce: {
    text: "La paciente se sonroja visiblemente. Sus ojos te siguen discretamente.",
    choices: [
      { text: "Pedirle su nombre.", next: "nombre" },
      { text: "Decirle que es muy linda.", next: "coqueteo_ligero" },
      { text: "Guardar silencio pero sostener la mirada.", next: "mirada_intensa" }
    ]
  },
  reaccion_sonrisa: {
    text: "Ella te devuelve la sonrisa y dice en voz baja: 'Eres linda, ¿lo sabías?'",
    choices: [
      { text: "Sonrojarte y seguir trabajando.", next: "nombre" },
      { text: "Decirle que también lo es ella.", next: "coqueteo_ligero" },
      { text: "Guardar silencio.", next: "nombre" }
    ]
  },
  reaccion_prof: {
    text: "Ella mantiene la mirada hacia el techo. 'Gracias por tu ayuda', dice con formalidad.",
    choices: [
      { text: "Asentir y seguir con la rutina.", next: "nombre" },
      { text: "Preguntar si recuerda su nombre.", next: "nombre" },
      { text: "Ofrecer conversar un poco.", next: "emocional" }
    ]
  },
  mirada_intensa: {
    text: "Los segundos se vuelven largos. Ella sonríe lentamente. 'Tienes unos ojos preciosos', dice.",
    choices: [
      { text: "Reír tímidamente.", next: "nombre" },
      { text: "Desviar la mirada.", next: "nombre" },
      { text: "Resaltar sus lentes y decirle que le quedan bien.", next: "coqueteo_ligero" }
    ]
  },
  nombre: {
    text: "'Creo... me llamo Alexandra', murmura. Parece recuperar poco a poco su energía.",
    choices: [
      { text: "Decirle que es un lindo nombre.", next: "coqueteo_ligero" },
      { text: "Preguntarle si tiene familia.", next: "emocional" },
      { text: "Decirle que estará bien ahora que está contigo.", next: "intensifica" }
    ]
  },
  coqueteo_ligero: {
    text: "Ambas ríen con cierta complicidad. El ambiente se vuelve cálido a pesar del entorno clínico.",
    choices: [
      { text: "Ofrecer quedarte un rato más.", next: "intensifica" },
      { text: "Tomarla de la mano suavemente.", next: "intensifica" },
      { text: "Inclinarte y besarle la frente.", next: "final_frente" }
    ]
  },
  intensifica: {
    text: "Alexandra susurra: 'Tu cercanía... me hace sentir mejor que cualquier medicina.'",
    choices: [
      { text: "Inclinarte y besarla suavemente.", next: "final_beso" },
      { text: "Acariciarle el rostro con ternura.", next: "final_ternura" },
      { text: "Permanecer en silencio, simplemente mirándola.", next: "final_mirada" }
    ]
  },
  final_beso: {
    text: "Tras el beso, el monitor cardíaco se estabiliza. Alexandra sonríe con energía. 'Ya no me siento enferma *guiño guiño*', dice. Y por primera vez, su mirada se llena de vida. Fin.",
    sound: "kiss"
  },
  final_frente: {
    text: "El beso en la frente la hace cerrar los ojos suavemente. 'Gracias por cuidarme...', dice. Aún débil, sonríe con confianza renovada. Fin."
  },
  final_ternura: {
    text: "Alexandra suspira, inclinándose apenas hacia tu caricia. 'Me haces sentir viva...', susurra. El monitor sigue sonando, pero su energía cambia. Fin."
  },
  final_mirada: {
    text: "En el silencio, sus miradas hablan más que mil palabras. Alexandra no dice nada, pero una lágrima cae, seguida de una sonrisa sincera. Fin."
  },
  fin_frio: {
    text: "Alexandra asiente. Jael se retira con el corazón palpitando... pero sin mirar atrás. Fin."
  }
};

let currentScene = 'start';

function playSound(name) {
  beep.pause(); heartbeat.pause(); kiss.pause(); softmusic.pause();
  beep.currentTime = heartbeat.currentTime = kiss.currentTime = softmusic.currentTime = 0;
  if (name === "beep") beep.play();
  else if (name === "heartbeat") heartbeat.play();
  else if (name === "kiss") {
    kiss.play();
    softmusic.play();
  }
}

function renderScene() {
  const scene = scenes[currentScene];
  textElement.innerText = scene.text;
  choicesElement.innerHTML = '';

  if (scene.sound) playSound(scene.sound);

  if (scene.choices) {
    scene.choices.forEach(choice => {
      const button = document.createElement('button');
      button.textContent = choice.text;
      button.addEventListener('click', () => {
        currentScene = choice.next;
        renderScene();
      });
      choicesElement.appendChild(button);
    });
  }
}

window.onload = renderScene;
