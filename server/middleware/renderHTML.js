// TODO: Move to middleware.
const IS_PROD = process.env.NODE_ENV === 'production';

export default function renderHTMLMiddleware() {
  return function renderHTML(req, res, next) {
    let { htmlContent } = res;

    if (typeof htmlContent === 'undefined') {
      return next();
    }

    res.render('base', {
      html: htmlContent,
      isProd: IS_PROD
    });
  };
}
