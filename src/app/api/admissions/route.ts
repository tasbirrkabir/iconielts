import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const admissionSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(120),
  course: z.string().trim().min(1).max(60),
  level: z.string().trim().min(1).max(80),
  mode: z.string().trim().min(1).max(60),
  message: z.string().trim().max(600).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = admissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form — some fields need attention." },
        { status: 400 }
      );
    }

    const { name, phone, email, course, level, mode, message } = parsed.data;

    const admission = await db.admission.create({
      data: {
        name,
        phone,
        email,
        course,
        level,
        mode,
        message: message || null,
      },
    });

    return NextResponse.json({ ok: true, id: admission.id }, { status: 201 });
  } catch (error) {
    console.error("[admissions] failed to save:", error);
    return NextResponse.json(
      {
        error:
          "We couldn't save your request right now. Please try again or reach us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
