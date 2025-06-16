const survey = new Survey.Model(json);
survey.applyTheme(SurveyTheme.DefaultLightPanelless);

survey.onComplete.add((sender, options) => {
  console.log(JSON.stringify(sender.data, null, 3));
});

// 1. URL-Parameter auslesen
const params = new URLSearchParams(window.location.search);
const q3Param = params.get("question3");

if (q3Param) {
  // 2. answers.json laden und passenden Eintrag finden
  fetch("./answers.json")
    .then((res) => {
      if (!res.ok) throw new Error("answers.json konnte nicht geladen werden");
      return res.json();
    })
    .then((answers) => {
      // Suche den ersten Eintrag, dessen question3 mit dem URL-Parameter übereinstimmt
      const entry = answers.find((a) => a.question3 === q3Param);
      if (entry) {
        // survey.data komplett überschreiben (oder nur entry.question3 setzen)
        survey.data = entry;
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      // Survey erst rendern, wenn fetch durch ist
      survey.render(document.getElementById("surveyElement"));
    });
} else {
  // kein URL-Parameter → normal rendern
  survey.render(document.getElementById("surveyElement"));
}
