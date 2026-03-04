import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json();

    // Basic backend validation (important)
    if (!firstName || !lastName || !email || !message) {
      return Response.json(
        { message: "All required fields must be filled." },
        { status: 400 },
      );
    }

    // Send email to YOU
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "janhavibandhane@gmail.com", // <-- PUT YOUR EMAIL HERE
      subject: `New Message from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Optional: Auto-reply to user
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for contacting me!",
      html: `
        <p>Hi ${firstName},</p>
        <p>Thank you for reaching out! I have received your message and will respond within 24–48 hours.</p>
        <br/>
        <p>Best regards,<br/>Janhavi</p>
      `,
    });

    return Response.json(
      { message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to send message." },
      { status: 500 },
    );
  }
}
