// Replace this with your developer's actual Render/Heroku/PythonAnywhere URL
const BASE_URL = "https://urbanly-backend.onrender.com"; 

export const urbanlyAPI = {
  // 1. Budget Calculation (POST) - Sending JSON
  calculateBudget: async (income: number, expenses: number) => {
    try {
      const response = await fetch(`${BASE_URL}/calculate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ income, expenses }),
      });
      return await response.json();
    } catch (error) {
      console.error("Budget API Error:", error);
      return null;
    }
  },

  // 2. ML Cost Prediction (GET) - Sending URL Parameters
  predictCost: async (data: {
    area: string;
    rent: number;
    food: number;
    transport: number;
    utilities: number;
    misc: number;
  }) => {
    try {
      const params = new URLSearchParams({
        area: data.area,
        rent: data.rent.toString(),
        food: data.food.toString(),
        transport: data.transport.toString(),
        utilities: data.utilities.toString(),
        misc: data.misc.toString()
      });
      
      const response = await fetch(`${BASE_URL}/predict/?${params.toString()}`);
      return await response.json();
    } catch (error) {
      console.error("ML Prediction Error:", error);
      return null;
    }
  }
};