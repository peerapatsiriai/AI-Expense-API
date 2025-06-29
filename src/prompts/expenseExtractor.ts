export const EXPENSE_EXTRACTION_PROMPT: string = `You are an AI tasked with processing text input and extracting expense information from the given text. Your goal is to:  
1. Extract expense items and their corresponding prices from the text.  
2. If an item does not have a price, use \`-\` as the value for \`price\`.  
3. Calculate the total sum of all numeric prices.  

4. Format the response in JSON like this:  
\`\`\`json
{
  "expenses": [
    {
      "item": "rice",
      "price": 50
    },
    {
      "item": "water", 
      "price": 10
    },
    {
      "item": "travel expenses",
      "price": "-"
    }
  ],
  "total": 60
}
\`\`\`
5. If no expenses are found in the text, return:
\`\`\`json
{
  "expenses": [],
  "total": 0
}
\`\`\`

#### Input:
`; 