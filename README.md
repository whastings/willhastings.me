# willhastings.me

This is my blog and personal project portfolio. It's a single-page app built on
React and Redux client-side and Express server-side. Yes, I know it's totally
over-engineering to make a blog a SPA. :)

## Development

### Docker

First, build all the things:

```bash
docker-compose build && docker-compose create
```

Then, run all the things:

```bash
docker-compose up
```

To run a command in the app container (e.g. bash):

```bash
docker-compose exec app the-command
```
