const survey = new Survey.Model(json);
survey.applyTheme(SurveyTheme.DefaultLightPanelless);

// URL-Parameter auslesen
const urlParams = new URLSearchParams(window.location.search);
const question3Key = urlParams.get("question3");

if (question3Key) {
  fetch("./answers.json")
    .then((response) => response.json())
    .then((dataArray) => {
      if (Array.isArray(dataArray)) {
        const match = dataArray.find(entry => entry.question3 === question3Key);
        if (match) {
          survey.data = match;
        }
      }
      // Rendern nach Daten-Setzen
      survey.render("surveyElement");
    })
    .catch((error) => {
      console.warn("answers.json konnte nicht geladen werden:", error);
      // Im Fehlerfall trotzdem rendern
      survey.render("surveyElement");
    });
} else {
  // Ohne URL-Parameter einfach direkt rendern
  survey.render("surveyElement");
}

survey.onComplete.add((sender, options) => {
  console.log(JSON.stringify(sender.data, null, 3));
});
