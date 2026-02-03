import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) return NextResponse.json({ insight: "שגיאה: חסר מפתח API" });

    const body = await req.json();
    const { userId, question } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // --- שליפת נתונים מסיבית ---

    // 1. הלוואות והתחייבויות (טבלה: fixed_expenses)
    const { data: fixedExpenses, error: fixedError } = await supabase
        .from('fixed_expenses')
        .select('*')
        .eq('user_id', userId);
    
    // לוג לבדיקה - יופיע בטרמינל שלך כשתריץ
    console.log("Fixed Expenses Found:", fixedExpenses); 

    // 2. תנועות אחרונות
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(10);

    // 3. תקציבים
    const { data: budgets } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', userId);

    // 4. יתרה
    const { data: accounts } = await supabase
        .from('accounts')
        .select('balance')
        .eq('user_id', userId);
    const totalBalance = accounts?.reduce((sum, acc) => sum + Number(acc.balance), 0) || 0;

    // --- הכנה ל-AI ---
    // אנחנו שולחים את המידע הגולמי (RAW) כדי שה-AI יסתדר עם שמות העמודות שלך
    const fixedDataRaw = fixedExpenses && fixedExpenses.length > 0 
        ? JSON.stringify(fixedExpenses) 
        : "אין התחייבויות קבועות (הטבלה ריקה או לא נמצאה).";

    const prompt = `
      אתה יועץ פיננסי חכם. יש לך גישה מלאה למסד הנתונים של המשתמש.

      להלן הנתונים הגולמיים (JSON) שנשלפו מהמערכת:
      
      1. **התחייבויות קבועות / הלוואות (חשוב מאוד!):**
      ${fixedDataRaw}
      (הערה: חפש כאן מידע על משכנתא, הלוואות, ותאריכי חיוב עתידיים).

      2. **פעולות אחרונות:**
      ${JSON.stringify(transactions)}

      3. **יתרה בבנק:** ${totalBalance} ש"ח.

      4. **תקציבים:** ${JSON.stringify(budgets)}

      השאלה של המשתמש: "${question || 'מה המצב שלי?'}"

      הנחיות:
      - נתח את ה-JSON של ההתחייבויות הקבועות. גם אם שמות השדות באנגלית (כמו title/amount/day) או בעברית, תבין את המשמעות לבד.
      - אם המשתמש שואל "כמה ירד ב-10/2", חפש בנתונים שורה שיש בה יום חיוב "10" או תאריך קרוב, ותסכום את הסכומים.
      - תהיה ספציפי. תגיד "אני רואה שיש לך משכנתא של X ש"ח".
    `;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/\*/g, '').trim();

    return NextResponse.json({ insight: text });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ insight: "שגיאה בשרת הנתונים." });
  }
}