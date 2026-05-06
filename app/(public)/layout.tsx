import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { PersonJsonLd } from "@/components/public/JsonLd";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PersonJsonLd />
      <Navbar />
      <main className="grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
