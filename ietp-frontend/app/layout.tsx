import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import  './globals.css';


export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
          <Sidebar />
          <main>
            
            {children}
          </main>
        
      </body>
    </html>
  );
}
