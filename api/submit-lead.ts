import { createClient } from '@supabase/supabase-js';
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

export default async function handler (req: VercelRequest, res: VercelResponse) {
    if(req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const { business_name, email, phone, service_category, source } = data;
    
        // --- minimal backend validation (required!) ---
        if (!business_name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
        }

        // --- insert into Supabase ---
        const { error } = await supabase.from("leads").insert([
        {
            business_name,
            email,
            phone: phone || null,
            service_category,
            source: source || null
        },
        ]);

        if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: "Database insert failed" });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ error: "Server error" });
    }

}