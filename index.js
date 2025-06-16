const survey = new Survey.Model(json);
survey.applyTheme(SurveyTheme.DefaultLightPanelless);

// Antworten-Map
let answerMap = {};
const urlParams = new URLSearchParams(window.location.search);
const prefillKey = urlParams.get("usecase");

// 1. Lade answers.json via Fetch
fetch("./answers.json")
  .then((response) => response.json())
  .then((data) => {
    answerMap = data;

    // 2. Wenn usecase angegeben ist → vorausfüllen
    if (prefillKey && answerMap[prefillKey]) {
      survey.data = answerMap[prefillKey];
    }

    // 3. Render starten
    survey.render("surveyElement");
  })
  .catch((err) => {
    console.error("answers.json konnte nicht geladen werden:", err);
    survey.render("surveyElement");
  });

// 4. Beim Absenden: Zeige JSON zur manuellen Speicherung
survey.onComplete.add((sender) => {
  const result = sender.data;
  const key = result["question3"];

  if (!key) {
    alert("Bitte gib einen Namen für den UseCase ein (Feld 1).");
    return;
  }

  answerMap[key] = result;

  const jsonOutput = JSON.stringify(answerMap, null, 2);
  document.getElementById("output").textContent =
    `✅ Antworten gespeichert unter Schlüssel "${key}".\n\n👉 Kopiere folgenden Inhalt in answers.json:\n\n${jsonOutput}`;
});
