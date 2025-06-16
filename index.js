const survey = new Survey.Model(json);
survey.applyTheme(SurveyTheme.DefaultLightPanelless);

// 1. Lade vorhandene Antworten aus embedded script tag (answers.json)
const answerRaw = document.getElementById("answerData").textContent;
let answerMap = {};
try {
  answerMap = JSON.parse(answerRaw);
} catch (e) {
  console.warn("answers.json konnte nicht gelesen werden.");
}

// 2. Wenn ein vorhandener UseCase-Wert (question3) im URL-Query steht → vorladen
const params = new URLSearchParams(window.location.search);
const prefillKey = params.get("usecase");
if (prefillKey && answerMap[prefillKey]) {
  survey.data = answerMap[prefillKey];
}

// 3. Beim Absenden: Antworten unter "question3" speichern
survey.onComplete.add((sender) => {
  const result = sender.data;
  const key = result["question3"];

  if (!key) {
    alert("Bitte fülle das Feld 'Name des UseCases' aus.");
    return;
  }

  // 3a. Update answers.json lokal im Speicher
  answerMap[key] = result;

  // 3b. Zeige JSON zur manuellen Speicherung
  const output = {
    ...answerMap
  };

  document.getElementById("output").innerText =
    `👉 Kopiere folgenden Inhalt in answers.json:\n\n${JSON.stringify(output, null, 2)}`;
});

$("#surveyElement").Survey({ model: survey });
