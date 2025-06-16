document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("question3");
  
  const survey = new Survey.Model(json);
  survey.applyTheme(Survey.Theme.DefaultLightPanelless);

  function initSurvey() {
    const container = document.getElementById("surveyContainer");
    survey.render(container);
    survey.onComplete.add(s => {
      document.getElementById("output").textContent = 
        JSON.stringify(s.data, null, 2);
    });
  }

  if (key) {
    fetch("./answers.json")
      .then(r => r.json())
      .then(arr => {
        const match = arr.find(v => v.question3 === key);
        if (match) survey.data = match;
        initSurvey();
      })
      .catch(err => {
        console.warn(err);
        initSurvey();
      });
  } else {
    initSurvey();
  }
});
