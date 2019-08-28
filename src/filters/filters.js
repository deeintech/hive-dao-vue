export function numeric(value) {
   return Number(value).toLocaleString()
}

export function isoDate(value) {
   return new Date(value).toISOString()
}

export function numeric2(value) {
   var thousand = 1000;
   var million = 1000000;
   var billion = 1000000000;
   var trillion = 1000000000000;
   if (value < thousand) {
      return String(value)
   }
   if (value >= thousand && value <= million) {
      return Math.abs(value / thousand).toFixed(3) + ' k'
   }
   if (value >= million && value <= billion) {
      return Math.abs(value / million).toFixed(3) + ' mln'
   }
   if (value >= billion && value <= trillion) {
      return Math.abs(value / billion).toFixed(3) + ' bln'
   }
   else {
      return Math.abs(value / trillion).toFixed(3) + ' trn'
   }
}
