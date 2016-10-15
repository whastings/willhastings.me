const highlightJS = require('highlight.js');
const marked = require('marked');
const { toISODate } = require('server/utils/dates');

marked.setOptions({
  highlight(code) {
    return highlightJS.highlightAuto(code).value;
  }
});

const formatters = module.exports = {
  post(model, {editable = false, includeBody = true} = {}) {
    let data = model.toJSON();

    if (data.publishDate) {
      data.publishDate = toISODate(model.publishDate);
    }

    if (editable) {
      data.bodyRaw = data.body;
    }

    let processedBody = marked(data.body);
    data.preview = data.preview || getPreviewFromBody(processedBody);

    if (includeBody) {
      data.body = processedBody;
    } else {
      delete data.body;
    }

    return data;
  },

  postList(models) {
    let data = models.map((model) => formatters.post(model, {includeBody: false}));

    return data;
  }
};

function getPreviewFromBody(body) {
  let firstParagraphMatch = body.match(/<p>(.*?)<\/p>/);
  return firstParagraphMatch && firstParagraphMatch[1] || body;
}
