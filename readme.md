# Blog

This blog uses a slightly modified version of the default [wintersmith](https://github.com/jnordberg/wintersmith) template blog theme in the following ways:

## Prism Syntax Highlighting

http://prismjs.com/index.html

Added `.css` and `.js` files to the `layout.jade` template. Changed `pre` and `code` background color to `#272822`.

## KSS for a living styleguide

To update the styleguide run:

`kss-node "contents/css/" --template "styleguide-template"`

