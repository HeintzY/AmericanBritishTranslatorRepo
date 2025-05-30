'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let locale = req.body.locale;
      let text = req.body.text;
      let translation = [];
      if (!locale || (!text && text !== "")) {
        return res.json({ error: 'Required field(s) missing' });
      }
      if (text === "") {
        return res.json({ error: 'No text to translate' });
      }
      if (locale === "american-to-british") {
        translation = translator.americanToBritish(text);
      }
      else if (locale === "british-to-american") {
        translation = translator.britishToAmerican(text);
      }
      else {
        return res.json({ error: 'Invalid value for locale field' });
      }
      if (translation[1] === text) {
        return res.json({ text: text, translation: "Everything looks good to me!" });
      }
      res.json({ text: text, translation: translation[1] })
    });
};
