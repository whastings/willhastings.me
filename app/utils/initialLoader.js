export default function initialLoader() {
  var firstLoad = true;
  return function initialLoad(data, next) {
    if (!firstLoad) {
      return next();
    }

    let initData = document.getElementById('init-data');
    data.props = JSON.parse(initData.innerHTML);
    firstLoad = false;
    next();
  }
}
