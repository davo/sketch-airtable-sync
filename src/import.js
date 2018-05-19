const { APIKey, base, table, view } = require('./secret')

const shades = require('shades')
const _ = require('lodash')
const { parseData } = require('./lib/utils')

const sketch = require('sketch')
const UI = sketch.UI
const Document = sketch.Document
const Artboard = sketch.Artboard
const Text = sketch.Text

let records = 15

const apiEndpoint = `https://api.airtable.com/v0/${base}/${table}?maxRecords=${records}&view=${view}&api_key=${APIKey}`

const document = sketch.fromNative(context.document)

const page = document.selectedPage

export default (context) => {
	const data = parseData(context)

	// Return if there is no selection and show message
	if (data.selectionCount <= 0) {
		UI.message('You need to select at least one layer or artboard')
		return
	}

	let newBaseUrl = UI.getStringFromUser('Insert you airtable link', apiEndpoint)

	fetch(apiEndpoint)
		.then((res) => res.json())
		.then((data) => {
			data.records.map((record, index) => {
				let { contentID, 'Copy Content': copy } = record.fields
				createText(copy, index)
			})
		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data)
			} else if (error.request) {
				console.log(error.request)
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message)
			}
			console.log(error.config)
		})
}

function createText(text, index) {
	let textId = _.camelCase(text)

	// Now let's create a new text layer, and a traditional value...
	let layer = new sketch.Text({
		text: text,
		frame: {
			x: 0,
			y: 30 * index,
			width: 90,
			height: 30
		},
		id: textId,
		name: textId,
		parent: page,
		alignment: sketch.Text.Alignment.left
	})

	layer.adjustToFit()

	// Finally, lets center the view on our new layer
	// so that we can see where it is.
	document.centerOnLayer(layer)
}
