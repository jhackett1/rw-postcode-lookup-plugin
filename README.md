A tiny WP plugin.

It gives you a shortcode `[rw-postcode-lookup-form]`, which spits out the HTML of a form and enqueues the JavaScript.

It uses rubbish hardcoded class selectors (like `.gf-name input[aria-label='Last name']`) to find the right form inputs to paste values into. These should still work if form inputs are made hidden.

## Developing

1. Run `npm i` and `npm run build`
2. Delete the node_modules, src and .cache directories, which aren't needed once built.
3. Compress the whole directory, upload it to a WP site and activate it.
