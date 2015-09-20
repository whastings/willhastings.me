import tinylr from 'tiny-lr';

const PORT = 35729;

export default function startLiveReload(watcher) {
  var server = tinylr();

  watcher.on('change', function() {
    tinylr.changed('');
  });

  server.listen(PORT, () => console.log(`Livereload listening on ${PORT}.`));
}
