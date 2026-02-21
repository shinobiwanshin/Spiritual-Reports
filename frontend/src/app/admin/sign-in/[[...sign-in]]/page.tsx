import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0a2e] px-6">
      <SignIn
        routing="path"
        path="/admin/sign-in"
        afterSignInUrl="/admin"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#1a1347] border border-white/10 shadow-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-white/60",
            socialButtonsBlockButton:
              "bg-white/5 border-white/10 text-white hover:bg-white/10",
            formFieldLabel: "text-white/70",
            formFieldInput:
              "bg-[#0f0a2e] border-white/10 text-white placeholder:text-white/30",
            footerActionLink: "text-[#cfa375] hover:text-[#e8c99b]",
            formButtonPrimary:
              "bg-gradient-to-r from-[#cfa375] to-[#e8c99b] text-[#0f0a2e] hover:opacity-90",
            identityPreview: "bg-[#0f0a2e] border-white/10",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-[#cfa375]",
          },
        }}
      />
    </div>
  );
}
