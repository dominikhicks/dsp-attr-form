const json = {
  "title": "Attribute Form",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "question3",
          "title": "Name des UseCases"
        },
        {
          "type": "comment",
          "name": "question4",
          "title": "Beschreibung des UseCases"
        },
        {
          "type": "text",
          "name": "question5",
          "title": "Wer sind die potentiellen Kunden?"
        },
        {
          "type": "checkbox",
          "name": "question6",
          "title": "Welche Services sind relevant?",
          "choices": [
            "DaaS",
            "SaaS",
            "Listenverarbeitung",
            "Auftragsverarbeitung (Consulting)"
          ]
        },
        {
          "type": "checkbox",
          "name": "question1",
          "title": "Welche Produkte sind relevant?",
          "choices": [
            "Buildings",
            "Parcels",
            "3D-Models",
            "Geofilter"
          ]
        },
        {
          "type": "checkbox",
          "name": "question2",
          "title": "Welche Attributgruppen sind relevant?",
          "choices": [
            "Flurstücke",
            "Gebäudedaten",
            "KI",
            "Risikozonen",
            "Umgebung",
            "Gewerbedaten"
          ]
        },
        {
          "type": "checkbox",
          "name": "question7",
          "title": "Welche Attribute sind relevant?",
          "choices": [
            {
              "value": "attr1_ki",
              "visibleIf": "{question2} allof ['KI']"
            },
            {
              "value": "attr2_ki",
              "visibleIf": "{question2} allof ['KI']"
            },
            {
              "value": "attr3_geb",
              "visibleIf": "{question2} allof ['Gebäudedaten']"
            },
            {
              "value": "attr4_risiko",
              "visibleIf": "{question2} allof ['Risikozonen']"
            }
          ]
        },
        {
          "type": "comment",
          "name": "question8",
          "title": "Alleinstellungsmerkmale / Highlights"
        },
        {
          "type": "checkbox",
          "name": "question9",
          "title": "Welche Bereiche müssen eingebunden werden?",
          "choices": [
            "Marketing",
            "Vertrieb",
            "Entwicklung"
          ]
        },
        {
          "type": "checkbox",
          "name": "question10",
          "title": "Welche Bereiche müssen den UseCase (zum Beispiel für Kampagnen) freigeben?",
          "choices": [
            "Marketing",
            "Vertrieb",
            "Entwicklung"
          ]
        }
      ]
    }
  ],
  "headerView": "advanced"
}
