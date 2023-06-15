import { Permanent_Marker } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/page.css";
const font = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Vass Company</title>
      </head>
      <body>
        <div className="app">
          <marquee style={{ height: "80px", width: "50%" }}>
            <h1 className={`${font.className} vass`}>
              Vass Company 🚀 Vass Company
            </h1>
          </marquee>
          {children}
        </div>
  
      </body>
    </html>
  );
}
