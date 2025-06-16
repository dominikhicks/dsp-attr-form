document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const key = params.get("question3");

  fetch("./answers.json")
    .then(res => res.json())
    .then(data => {
      const match = data.find(entry => entry.question3 === key);
      const model = new Survey.Model(json);
      if (match) model.data = match;

      const survey = new Survey.Survey({ model });
      survey.onComplete.add(sender => {
        console.log("Antworten:", sender.data);
      });

      survey.render("surveyElement");
    });
});
