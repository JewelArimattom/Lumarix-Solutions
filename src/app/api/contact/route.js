import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, contact, projectType, message } = body;

    if (!name || !contact || !projectType || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const entry = await Contact.create({ name, contact, projectType, message });
    return NextResponse.json({ success: true, id: entry._id }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
