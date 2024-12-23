import "./globals.css"; // Tailwind CSS or global styles



export const metadata = {
  title: "My Next.js App",
  description: "A sample app built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
       
        <div className="flex-grow">{children}</div>
        
      </body>
    </html>
  );
}
