# Ratchet v2.0 [![devDependencies](https://david-dm.org/maker/ratchet/dev-status.png?theme=shields.io)](https://david-dm.org/maker/ratchet#info=devDependencies)

Build mobile apps with simple HTML, CSS, and JS components.

## Getting Started

- Clone the repo with `git clone https://github.com/twbs/ratchet.git` or just [download](http://github.com/twbs/ratchet/archive/v2.0.0.zip) the bundled CSS and JS
- [Read the docs](http://goratchet.com) to learn about the components and how to get a prototype on your phone
- We will have example apps to check out very soon!

Take note that our master branch is our active, unstable development branch and that if you're looking to download a stable copy of the repo, check the [tagged downloads](https://github.com/twbs/ratchet/tags).

## Documentation

Ratchet's documentation is built with [Jekyll](http://jekyllrb.com) and publicly hosted on GitHub Pages at <http://goratchet.com>. The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation).
2. From the root `/ratchet/docs` directory, run `jekyll serve` in the command line.
3. Open <http://localhost:4000> in your browser, and boom!

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).

## Support

Questions or discussions about Ratchet should happen in the [Google group](https://groups.google.com/forum/#!forum/goratchet) or hit us up on Twitter [@GoRatchet](https://twitter.com/goratchet).

## Reporting bugs & contributing

Please file a GitHub issue to [report a bug](https://github.com/twbs/ratchet/issues). When reporting a bug, be sure to follow the [contributor guidelines](https://github.com/twbs/ratchet/blob/master/CONTRIBUTING.md).

## Troubleshooting

A small list of "gotchas" are provided below for designers and developers starting to work with Ratchet

- Ratchet is designed to respond to touch events from a mobile device. In order to use mouse click events (for desktop browsing and testing), you have a few options:
    - Enable touch event emulation in Chrome (found in the overrides tab in the web inspector preferences)
    - Use a javascript library like fingerblast.js to emulate touch events (ideally only loaded from desktop devices)
- Script tags containing javascript will not be executed on pages that are loaded with push.js. If you would like to attach event handlers to elements on other pages, document-level event delegation is a common solution.
- Ratchet uses XHR requests to fetch additional pages inside the application. Due to security concerns, modern browsers prevent XHR requests when opening files locally (aka using the file:/// protocol); consequently, Ratchet does not work when opened directly as a file.
    - A common solution to this is to simply serve the files from a local server. One convenient way to achieve this is to run ```python -m SimpleHTTPServer <port>``` to serve up the files in the current directory to ```http://localhost:<port>```

## Maintainer

Connor Sears

- <https://twitter.com/connors>
- <https://github.com/connors>



Created by Connor Sears, Dave Gamache, and Jacob Thornton


## License

Ratchet is licensed under the [MIT License](http://opensource.org/licenses/MIT).
