document.addEventListener("DOMContentLoaded", function () {
  const survey = new Survey.Model(json);
  survey.applyTheme(SurveyTheme.DefaultLightPanelless);

  const urlParams = new URLSearchParams(window.location.search);
  const question3Key = urlParams.get("question3");

  const container = document.getElementById("surveyElement");

  if (!container) {
    console.error("❌ surveyElement nicht gefunden im DOM.");
    return;
  }

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
        survey.render(container);
      })
      .catch((error) => {
        console.warn("answers.json konnte nicht geladen werden:", error);
        survey.render(container);
      });
  } else {
    survey.render(container);
  }

  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });
});
