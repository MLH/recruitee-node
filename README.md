# Recruitee Node.js Library

The Recruitee Node library is a simple wrapper for the [Recruitee Private
API](recruitee-api-docs) for applications written in Node.js.

## Installation

Install the package with:

```sh
npm install recruitee --save
```

## Usage

To start using the library, create a new instance of the Recruitee class and
pass it your company ID and API token. Both of these can be found on your
[Recruitee dashboard](recruitee-dashboard).

```javascript
const Recruitee = require('recruitee');
const client = new Recruitee('YOUR_COMPANY_ID', 'YOUR_API_TOKEN');
```

All API methods return promises, which means you can chain them to create
complex workflows:

```javascript
const candidateId = 123;

client.candidates.fetch(candidateId)
  .then((candidate) => {
    return client.evaluations.create(candidateId, {
      kind: "template_form",
      rating: "yes",
      rating_note: "Awesome interview!"
    });
  })
```

## Development

Run the test suite with:

```sh
npm test
```

[recruitee-api-docs]: https://api.recruitee.com/docs/index.html
[recruitee-dashboard]: https://app.recruitee.com/#/settings/api_tokens
