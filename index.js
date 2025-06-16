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
      // 🟢 Korrekte Übergabe des DOM-Elements
      survey.render(document.getElementById("surveyElement"));
    })
    .catch((error) => {
      console.warn("answers.json konnte nicht geladen werden:", error);
      survey.render(document.getElementById("surveyElement"));
    });
} else {
  survey.render(document.getElementById("surveyElement"));
}

survey.onComplete.add((sender, options) => {
  console.log(JSON.stringify(sender.data, null, 3));
});
