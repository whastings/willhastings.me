const marked = require('marked');
const { toISODate } = require('server/utils/dates');

const formatters = module.exports = {
  post(model, includeBody = true) {
    let data = model.toJSON();
    data.publishDate = toISODate(model.publishDate);
    data.body = marked(data.body);
    data.preview = data.preview || getPreviewFromBody(data.body);

    if (!includeBody) {
      delete data.body;
    }

    return data;
  },

  postList(models) {
    let data = models.map((model) => formatters.post(model, false));

    return data;
  }
};

function getPreviewFromBody(body) {
  let firstParagraphMatch = body.match(/<p>(.*?)<\/p>/);
  return firstParagraphMatch && firstParagraphMatch[1] || body;
}
