const survey = new Survey.Model(json);
survey.applyTheme(SurveyTheme.DefaultLightPanelless);

const urlParams = new URLSearchParams(window.location.search);
const usecaseName = urlParams.get("usecase");

let answersArray = [];

// 🔄 Lade answers.json als Array von Antwortobjekten
fetch("./answers.json")
  .then((response) => response.json())
  .then((data) => {
    answersArray = Array.isArray(data) ? data : [];

    // 🔍 Wenn ein UseCase über URL definiert ist → passende Antwort suchen
    if (usecaseName) {
      const match = answersArray.find(item => item.question3 === usecaseName);
      if (match) {
        survey.data = match;
      }
    }

    // Jetzt rendern
    survey.render("surveyElement");
  })
  .catch((err) => {
    console.warn("answers.json konnte nicht geladen werden:", err);
    survey.render("surveyElement");
  });

// ✅ Beim Absenden neue Antwort einfügen & JSON anzeigen
survey.onComplete.add((sender) => {
  const result = sender.data;
  const key = result["question3"];

  if (!key) {
    alert("Bitte gib einen Namen für den UseCase ein (Feld 1).");
    return;
  }

  // Vorherige Antwort mit gleichem question3 überschreiben
  answersArray = answersArray.filter(item => item.question3 !== key);
  answersArray.push(result);

  const jsonOutput = JSON.stringify(answersArray, null, 2);
  document.getElementById("output").textContent =
    `✅ Antworten gespeichert für "${key}".\n\n👉 Kopiere folgenden Inhalt in answers.json:\n\n${jsonOutput}`;
});
