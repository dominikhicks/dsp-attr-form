document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const question3Key = urlParams.get("question3");

  const model = new Survey.Model(json);
  model.applyTheme(Survey.Theme.DefaultLightPanelless);

  function render(model) {
    const survey = new Survey.Survey({ model });
    survey.onComplete.add(sender => {
      const result = JSON.stringify(sender.data, null, 2);
      document.getElementById("output").textContent = `Antwort:\n\n${result}`;
    });
    survey.render("surveyElement");
  }

  if (question3Key) {
    fetch("answers.json")
      .then(res => res.json())
      .then(data => {
        const match = data.find(entry => entry.question3 === question3Key);
        if (match) model.data = match;
        render(model);
      })
      .catch(error => {
        console.warn("answers.json konnte nicht geladen werden:", error);
        render(model);
      });
  } else {
    render(model);
  }
});
