import appConfig from '@/config/appConfig';


export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Expense API',
      version: '1.0.0',
      description: 'API for extracting expense information from text using Google Gemini AI',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: `${appConfig.apiBaseURL}:${appConfig.port}`,
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Expense: {
          type: 'object',
          properties: {
            item: {
              type: 'string',
              description: 'Name of the expense item'
            },
            price: {
              oneOf: [
                { type: 'number' },
                { type: 'string' }
              ],
              description: 'Price of the item (number or "-" if unknown)'
            }
          },
          required: ['item', 'price']
        },
        ExpenseResult: {
          type: 'object',
          properties: {
            expenses: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Expense'
              }
            },
            total: {
              type: 'number',
              description: 'Total sum of all numeric prices'
            }
          },
          required: ['expenses', 'total']
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            },
            status: {
              type: 'number',
              description: 'HTTP status code'
            }
          }
        }
      }
    }
  },
  apis: ['./src/modules/**/*.ts']
};