import Vue from 'vue';


var VueTruncate = require('vue-truncate-filter')
Vue.use(VueTruncate);
console.log('truncante', VueTruncate)

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function toUSD(value) {
  return `$${value}`;
}

export function capitalize(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function uppercase(value) {
  if (!value) return '';
  value = value.toString();
  return value.toUpperCase();
}

const filters = { timeAgo, toUSD, capitalize, uppercase };

export default filters
  Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
