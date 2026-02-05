/**
 * Bank API Integration Service (Scaffolding)
 * 
 * This service is designed to handle Open Banking API interactions.
 * In a real production environment, this would interact with a provider like:
 * - Israeli Open Banking (Berlin Group Standard)
 * - Plaid / Yodlee
 * - Nordigen
 */

// Configuration for supported providers
export const BANK_PROVIDERS = [
    { id: 'hapoalim', name: 'Bank Hapoalim', logo: 'P', color: 'bg-red-600' },
    { id: 'leumi', name: 'Bank Leumi', logo: 'L', color: 'bg-pink-600' },
    { id: 'discount', name: 'Discount Bank', logo: 'D', color: 'bg-green-600' },
    { id: 'mizrahi', name: 'Mizrahi Tefahot', logo: 'M', color: 'bg-orange-600' },
    { id: 'isracard', name: 'Isracard', logo: 'I', color: 'bg-blue-600' },
    { id: 'max', name: 'Max (Leumi Card)', logo: 'X', color: 'bg-red-500' },
    { id: 'cal', name: 'Cal (Visa)', logo: 'C', color: 'bg-yellow-600' },
];

/**
 * Simulates initiating a connection with a bank provider.
 * In a real app, this would redirect the user to the Bank's OAuth consent page.
 * 
 * @param {string} providerId 
 * @returns {Promise<{success: boolean, token?: string, error?: string}>}
 */
export async function initiateBankConnection(providerId) {
    console.log(`[BankAPI] Initiating connection to ${providerId}...`);

    // SIMULATION: Delay to mimic network request
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For now, valid providers succeed.
    const provider = BANK_PROVIDERS.find(p => p.id === providerId);
    if (!provider) {
        return { success: false, error: 'Provider not found' };
    }

    // Return a mock "Access Token"
    return {
        success: true,
        token: `mock_token_${providerId}_${Date.now()}`,
        status: 'active'
    };
}

/**
 * Fetches the latest balance for a connected account.
 * 
 * @param {string} token 
 * @returns {Promise<number>}
 */
export async function fetchAccountBalance(token) {
    console.log(`[BankAPI] Fetching balance with token ${token}...`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return a random simulated balance
    return Math.floor(Math.random() * 50000) - 5000;
}

/**
 * Fetches recent transactions.
 * 
 * @param {string} token 
 * @param {Date} fromDate 
 */
export async function fetchTransactions(token, fromDate) {
    console.log(`[BankAPI] Fetching transactions since ${fromDate}...`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock transactions
    return [
        { id: 1, date: new Date().toISOString(), description: 'Supermarket', amount: -450 },
        { id: 2, date: new Date().toISOString(), description: 'Gas Station', amount: -200 },
        { id: 3, date: new Date().toISOString(), description: 'Salary', amount: 12000 },
    ];
}
