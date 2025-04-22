import { Webhook } from "svix";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ClerkEvent {
    type: "user.created";
    data: {
      id: string;
      email_addresses: { email_address: string }[];
      image_url: string;
      first_name: string | null;
      last_name: string | null;
    };
}
  

export async function POST(req: Request) {
  const payload = await req.text(); // Use raw body for Clerk
  const headerList = await headers(); // ✅ Await this

  const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt;
  try {
    evt = svix.verify(payload, {
      "svix-id": headerList.get("svix-id")!,
      "svix-timestamp": headerList.get("svix-timestamp")!,
      "svix-signature": headerList.get("svix-signature")!,
    })as ClerkEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name } = data;

    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          image: image_url,
        },
      });
    } catch (err) {
      console.error("User creation failed:", err);
      return new Response("DB error", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
