import { i18n } from '@/plugins/i18n.js'

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
   let result = new Number(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
   return result
}

// in 5 days
export function daysLeft(value) {
   let today = new Date()
   let one_day=1000*60*60*24
   let result = ` ${i18n.t('common.in')} ${Math.ceil((new Date(value).getTime() - today.getTime()) / (one_day))} ${i18n.t('common.days')}`
   return result
}

// Sep 1, 2019 ("MMM D, YYYY")
export function dateFilter(value) {
   let options = { day : 'numeric', month : 'short', year : 'numeric' }
   let result = new Date(value).toLocaleDateString(undefined, options)
   return result
}