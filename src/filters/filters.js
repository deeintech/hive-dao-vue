export function numeric(value) {
   var thousand = 1000
   var million = 1000000
   var billion = 1000000000
   var trillion = 1000000000000
   if (value < thousand) {
      return String(value)
   }
   if (value >= thousand && value <= million) {
      return Math.abs(value / thousand)
   }
   if (value >= million && value <= billion) {
      return Math.abs(value / million).toFixed(3)
   }
   if (value >= billion && value <= trillion) {
      return Math.abs(value / billion).toFixed(3)
   }
   else {
      return Math.abs(value / trillion).toFixed(3)
   }
}

export function numeric2(value) {
   var million = 1000000
   var billion = 1000000000
   var trillion = 1000000000000
   var quadrillion = 1000000000000000
   if (value < million) {
      return Math.abs(value / million).toFixed(3) + ' V'
   }
   if (value >= million && value <= billion) {
      return Math.abs(value / billion).toFixed(3) + ' KV'
   }
   if (value >= billion && value <= trillion) {
      return Math.abs(value / trillion).toFixed(3) + ' MV'
   }
   if (value >= trillion) {
      return Math.abs(value / quadrillion).toFixed(3) + ' GV'
   }
}

export function numeric3(value) {
   return new Number(value).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 3 })
}