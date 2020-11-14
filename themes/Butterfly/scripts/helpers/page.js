/**
 * Butterfly
 * @example
 *  page_description()
 *  injectHtml(data)
 *  cloudTags(source, minfontsize, maxfontsize, limit)
 */

'use strict'

const { stripHTML } = require('hexo-util')

hexo.extend.helper.register('page_description', function () {
  const { config, page } = this
  let description = page.description || page.content || page.title || config.description

  if (description) {
    description = stripHTML(description).substring(0, 200)
      .trim()
      .replace(/\n/g, ' ')
    return description
  }
})

hexo.extend.helper.register('injectHtml', function (data) {
  let result = ''
  if (!data) return ''
  for (var i = 0; i < data.length; i++) {
    result += data[i]
  }
  return result
})

hexo.extend.helper.register('cloudTags', function (source, minfontsize, maxfontsize, limit) {
  const env = this
  let result = ''
  const tagLimit = limit === 0 ? source.length : limit
  source.sort('name').limit(tagLimit).forEach(function (tags) {
    var fontSize = Math.floor(Math.random() * (maxfontsize - minfontsize) + minfontsize) + 'px'
    var color = 'rgb(' + Math.floor(Math.random() * 201) + ', ' + Math.floor(Math.random() * 201) + ', ' + Math.floor(Math.random() * 201) + ')' // 0,0,0 -> 200,200,200
    result += `<a href='${env.url_for(tags.path)}' style='font-size:${fontSize}; color:${color}'>${tags.name}</a>`
  })
  return result
})
