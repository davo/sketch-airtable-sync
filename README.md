# Sketch Airtable Sync

A simple way to import content from an Airtable URL into Sketch.

Disclaimer: This is a WIP project. While I'm learning how to build Sketch plugins with the new Sketch API, I wanted to do something useful for my work. Feel free to reuse.

## Motivation

## Usage

1.  Open the file `secret-sample.js` in `/src`, add your own Airtable information and save the file as `secret.js`

```javascript
module.exports = {
	APIKey: 'YOUR-API-KEY',
	base: 'YOUR-BASE-ID',
	table: 'YOUR-TABLE-NAME',
	view: 'YOUR-VIEW-NAME'
}
```

2.  Run `npm install`

3.  Run `npm run build`
