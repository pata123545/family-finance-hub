import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    // אם יש פרמטר "next" (כמו ששמנו: verified), הוא ישתמש בו.
    // אחרת, הוא יעביר לדאשבורד כברירת מחדל.
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const cookieStore = cookies()

        // יצירת הלקוח של Supabase כדי לנהל את העוגיות
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    get(name) {
                        return cookieStore.get(name)?.value
                    },
                    set(name, value, options) {
                        cookieStore.set({ name, value, ...options })
                    },
                    remove(name, options) {
                        cookieStore.delete({ name, ...options })
                    },
                },
            }
        )

        // החלפת הקוד החד-פעמי ב-Session קבוע למשתמש
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // אם הכל תקין - מעביר את המשתמש לדף היעד (verified)
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // אם הייתה שגיאה בקוד או שאין קוד, מחזיר לדף שגיאה
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}