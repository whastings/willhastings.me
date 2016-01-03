export default function initialLoader() {
  var firstLoad = true;
  return function initialLoad(data, next) {
    if (!firstLoad) {
      return next();
    }

    let initData = document.getElementById('init-data');
    if (initData) {
      data.props = JSON.parse(initData.innerHTML);
      addContent(data.props);
    }

    firstLoad = false;
    next();
  };
}

function addContent(data) {
  Object.keys(data).forEach((key) => {
    let value = data[key];
    if (/^#/.test(value)) {
      data[key] = document.querySelector(value).innerHTML;
    }
  });
}
