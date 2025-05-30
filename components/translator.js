const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    americanToBritish(text) {
        let translation = text.charAt(0).toLowerCase() + text.slice(1);
        let translationHighlighted = text.charAt(0).toLowerCase() + text.slice(1);
        Object.keys(americanOnly).forEach(key => {
            let regex = new RegExp(`${key}(?=\\s|[.,;:!?]|$)`, 'gi');
            translation = translation.replace(regex, americanOnly[key]);
            translationHighlighted = translationHighlighted.replace(regex, `<span class="highlight">${americanOnly[key]}</span>`);
        });
        Object.keys(americanToBritishSpelling).forEach(key => {
            let regex = new RegExp(`${key}(?=\\s|[.,;:!?]|$)`, 'g');
            translation = translation.replace(regex, americanToBritishSpelling[key]);
            translationHighlighted = translationHighlighted.replace(regex, `<span class="highlight">${americanToBritishSpelling[key]}</span>`);
        });
        Object.keys(americanToBritishTitles).forEach(key => {
            let capitalizedValue = americanToBritishTitles[key].charAt(0).toUpperCase() + americanToBritishTitles[key].slice(1);
            let escapedKey = key.replace('.', '\\.');
            let regex = new RegExp(`${escapedKey}(?=\\s|[.,;:!?]|$)`, 'g');
            translation = translation.replace(regex, capitalizedValue);
            translationHighlighted = translationHighlighted.replace(regex, `<span class="highlight">${capitalizedValue}</span>`);
        });
        let timeMatches = translationHighlighted.match(/\b\d{1,2}:[0-5]\d\b/g);
        if (timeMatches) {
            timeMatches.forEach(timeMatch => {
                let timeParts = timeMatch.split(":");
                let translatedTime = timeParts[0] + "." + timeParts[1];
                let regex = new RegExp(timeMatch, 'g');
                translation = translation.replace(regex, translatedTime);
                translationHighlighted = translationHighlighted.replace(regex, `<span class="highlight">${translatedTime}</span>`);
            });
        }
        translation = translation.charAt(0).toUpperCase() + translation.slice(1);
        translationHighlighted = translationHighlighted.charAt(0).toUpperCase() + translationHighlighted.slice(1);
        return [translation, translationHighlighted];
    }

    britishToAmerican(text) {
        let translation = text.charAt(0).toLowerCase() + text.slice(1);
        let translationHighlighted = text.charAt(0).toLowerCase() + text.slice(1);
        Object.keys(britishOnly).forEach(key => {
            let regex = new RegExp(`${key}(?=\\s|[.,;:!?]|$)`, 'gi');
            translation = translation.replace(regex, britishOnly[key]);
            translationHighlighted = translationHighlighted.replace(regex, `<span class="highlight">${britishOnly[key]}</span>`);
        });
        Object.entries(americanToBritishSpelling).forEach(([key, value]) => {
            const regex = new RegExp(`${value}(?=\\s|[.,;:!?]|$)`, 'g');
            translation = translation.replace(regex, key);
            translationHighlighted = translationHighlighted.replace(regex, `<span class="highlight">${key}</span>`);
        });
        Object.entries(americanToBritishTitles).forEach(([key, value]) => {
            let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            const regex = new RegExp(`\\b${value}(?!\\.)\\b(?=\\s|[.,;:!?]|$)`, 'g');
            translation = translation.replace(regex, capitalizedKey);
            translationHighlighted = translationHighlighted.replace(regex, `<span class="highlight">${capitalizedKey}</span>`);
        });
        let timeMatches = translationHighlighted.match(/\b\d{1,2}.[0-5]\d\b/g);
        if (timeMatches) {
            timeMatches.forEach(timeMatch => {
                let timeParts = timeMatch.split(".");
                let translatedTime = timeParts[0] + ":" + timeParts[1];
                let regex = new RegExp(timeMatch, 'g');
                translation = translation.replace(regex, translatedTime);
                translationHighlighted = translationHighlighted.replace(regex, `<span class="highlight">${translatedTime}</span>`);
            });
        }
        translation = translation.charAt(0).toUpperCase() + translation.slice(1);
        translationHighlighted = translationHighlighted.charAt(0).toUpperCase() + translationHighlighted.slice(1);
        return [translation, translationHighlighted];
    }
}

module.exports = Translator;