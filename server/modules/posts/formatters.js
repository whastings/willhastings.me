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

    let processedBody = processBody(data.body);
    data.preview = marked(processedBody.preview);

    if (includeBody) {
      data.body = marked(processedBody.content);
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

function processBody(body) {
  let preview;
  let content = body;

  if (body.indexOf('[PREVIEW]') > -1) {
    let [ beforePreviewStart, afterPreviewStart ] = body.split('[PREVIEW]');
    let [ previewContent, afterPreview ] = afterPreviewStart.split('[/PREVIEW]');
    preview = previewContent;
    content = beforePreviewStart + preview + afterPreview;
  }

  preview = preview || content;
  return {content, preview};
}
