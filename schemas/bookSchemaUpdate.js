const bookSchemaUpdate = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: true,
    properties: {
      isbn: { type: 'string' },
      amazon_url: { type: 'string', format: 'uri' },
      author: { type: 'string' },
      language: { type: 'string' },
      pages: { type: 'integer', minimum: 0 },
      publisher: { type: 'string' },
      title: { type: 'string' },
      year: { type: 'integer', minimum: 1900, maximum: 2100 }
    },
    required: ['isbn', 'amazon_url', 'author', 'language', 'pages', 'publisher', 'title', 'year']
  };
  
  module.exports = bookSchemaUpdate;
  