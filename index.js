document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const question3Key = urlParams.get("question3");

  const survey = new Survey.Model(json);
  survey.applyTheme(Survey.Theme.DefaultLightPanelless);

  function renderSurvey() {
    survey.render("surveyElement");
  }

  if (question3Key) {
    fetch("./answers.json")
      .then((res) => res.json())
      .then((dataArray) => {
        if (Array.isArray(dataArray)) {
          const match = dataArray.find(entry => entry.question3 === question3Key);
          if (match) {
            survey.data = match;
          }
        }
        renderSurvey();
      })
      .catch((err) => {
        console.warn("answers.json konnt nicht geladen werden:", err);
        renderSurvey();
      });
  } else {
    renderSurvey();
  }

  survey.onComplete.add((sender) => {
    const result = JSON.stringify(sender.data, null, 2);
    document.getElementById("output").textContent = `Antwort:\n\n${result}`;
  });
});
