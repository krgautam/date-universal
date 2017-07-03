# date-universal
date-universal is a node module used to print date in desired format. It can be used for any localization you want to use in your node application.It can be easily used to add day,month,week hour,minute to a datetime value.you can use format using in php. you don't need to remember extra format or function to use this.
#### install

```
npm install --save date-universal
```
#### Usage
```javascript
'use strict'

var dateUniversal = require('date-universal')
date.UTC('Asia/Kolkata')
console.log(dateUniversal.date('Y-m-d H:i:s')) // => 2017-07-03 16:53:14
dateUniversal.localizationData.fr = {
  longDays: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
  shortDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
  longMonths: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  shortMonths: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Auu', 'Sep', 'Oct', 'Nov', 'Dec']
}
console.log(dateUniversal.date('F j Y l', '+7 months', 'fr')) //février 3 2018 samedi
console.log(dateUniversal.date('F j Y l', '+7 months'))//February 3 2018 Saturday

``` 
#### date(format[, date,locale])

`format` is the output format of the date. `date` can be an instance of javascript's `Date` object.Js date format is different than php.
#### date(format[, +/-(day/month/year/hour/minute/second),locale])
you can add days, month, year, hour ,minute and second to a date by passing parmater like

'+7 days'
'-8 month'
'+9 year'
e.t.c.
