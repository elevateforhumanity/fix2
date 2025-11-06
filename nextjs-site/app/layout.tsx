import type { Metadata } from 'next';
import './globals.css';
import './elevate-design.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Elevate for Humanity Career and Technical Institute',
  description:
    'Empower your dreams with federally-funded workforce training programs. Build in-demand skills, earn industry certifications, and launch a rewarding career—at $0 cost with approved funding.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <head>
        <link rel="canonical" href="https://elevateforhumanity.org/" />
      </head>
      <body className="overflow-x-hidden">
        <div
          id="main-body"
          className="flex flex-col h-full overflow-y-auto overflow-x-hidden smooth-scroll transition-all"
        >
          <header
            id="website-header"
            className="transition-colors duration-300"
          >
            <div
              className="relative z-10 grid items-center lg:gap-6 xl:gap-10 mx-auto pt-8 pb-8 container"
              style={{ gridTemplateColumns: 'auto auto auto' }}
            >
              <div className="col-span-2 lg:col-span-1">
                <Link className="grid max-w-full" href="/">
                  <h2 className="heading-small lg:heading-medium max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
                    Elevate for Humanity Career and Technical Institute
                  </h2>
                </Link>
              </div>
              <div className="hidden lg:flex item-center justify-end gap-10 lg:col-span-2">
                <ul className="hidden items-center flex-wrap lg:flex justify-end gap-x-6">
                  <li className="border-b-2 border-transparent hover:border-[#4D4B37]">
                    <Link
                      className="block body-normal whitespace-nowrap py-1.5"
                      href="/programs"
                    >
                      Programs
                    </Link>
                  </li>
                  <li className="border-b-2 border-transparent hover:border-[#4D4B37]">
                    <Link
                      className="block body-normal whitespace-nowrap py-1.5"
                      href="/lms"
                    >
                      LMS
                    </Link>
                  </li>
                  <li className="border-b-2 border-transparent hover:border-[#4D4B37]">
                    <Link
                      className="block body-normal whitespace-nowrap py-1.5"
                      href="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li className="border-b-2 border-transparent hover:border-[#4D4B37]">
                    <Link
                      className="block body-normal whitespace-nowrap py-1.5"
                      href="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="border-b-2 border-transparent hover:border-[#4D4B37]">
                    <Link
                      className="block body-normal whitespace-nowrap py-1.5"
                      href="/apply"
                    >
                      Apply
                    </Link>
                  </li>
                  <li className="border-b-2 border-transparent hover:border-[#4D4B37]">
                    <Link
                      className="block body-normal whitespace-nowrap py-1.5"
                      href="/auth/login"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
