import { NextRequest, NextResponse } from "next/server";
import { analyzeComplaintWithGemini, AnalyzeComplaintInput } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      studentName,
      studentId,
      department,
      campusLocation,
      category,
      title,
      description
    } = body;

    // Field validation
    if (!campusLocation || !category || !title || !description) {
      return NextResponse.json(
        {
          error: "Missing required fields: campusLocation, category, title, and description are mandatory."
        },
        { status: 400 }
      );
    }

    const input: AnalyzeComplaintInput = {
      studentName: studentName || "Anonymous Student",
      studentId: studentId || "N/A",
      department: department || "General",
      campusLocation: String(campusLocation).trim(),
      category: category,
      title: String(title).trim(),
      description: String(description).trim()
    };

    const analysis = await analyzeComplaintWithGemini(input);

    return NextResponse.json({
      success: true,
      analysis
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    console.error("API /api/analyze-complaint error:", err);
    return NextResponse.json(
      { error: "Failed to process complaint analysis", details: errorMsg },
      { status: 500 }
    );
  }
}
