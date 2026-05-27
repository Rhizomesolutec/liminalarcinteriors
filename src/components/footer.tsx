import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FooterFooter() {
  return (
    <footer className="bg-[#131313] pt-24 pb-12 border-t border-[#C4A05A]/10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="max-w-xs">
            <div className="text-2xl font-light tracking-tighter text-[#F5F0E8] font-headline mb-6">
              Liminal Arc <span className="text-[#C4A05A]">Interiors</span>
            </div>
            <p className="text-sm opacity-40 leading-loose text-gray-300">
              Dubai's leading boutique architectural firm specializing in high-fidelity interior design and comprehensive facility management.
            </p>
          </div>

          {/* Nav Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            
            {/* Quick Links */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-[#C4A05A] font-bold">Studio</p>
              <ul className="space-y-2 text-sm opacity-60">
                <li><Link href="/" className="hover:text-[#C4A05A]">Home</Link></li>
                <li><Link href="/projects" className="hover:text-[#C4A05A]">Portfolio</Link></li>
                <li><Link href="/ourservices" className="hover:text-[#C4A05A]">Services</Link></li>
                <li><Link href="/contact" className="hover:text-[#C4A05A]">Contact</Link></li>
              </ul>
            </div>

            {/* Services Links */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-[#C4A05A] font-bold">Services</p>
              <ul className="space-y-2 text-sm opacity-60">
                <li><Link href="/ourservices/interior-design" className="hover:text-[#C4A05A]">Interior Design</Link></li>
                <li><Link href="/ourservices/architectural-design" className="hover:text-[#C4A05A]">Architecture</Link></li>
                <li><Link href="/ourservices/mep-drawings" className="hover:text-[#C4A05A]">MEP Drawings</Link></li>
                <li><Link href="/ourservices/approvals-and-authorities" className="hover:text-[#C4A05A]">Approvals</Link></li>
              </ul>
            </div>

            {/* Connect Links */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-[#C4A05A] font-bold">Connect</p>
              <ul className="space-y-2 text-sm opacity-60">
                <li>
                  <Link href="https://www.instagram.com/liminalarc.interiors?igsh=eXN1aW1ubDMybnow" target="_blank" className="hover:text-[#C4A05A]">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/liminalarcinteriors/" target="_blank" className="hover:text-[#C4A05A]">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://www.facebook.com/profile.php?id=61573591764228" target="_blank" className="hover:text-[#C4A05A]">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-[#C4A05A] font-bold">Legal</p>
              <ul className="space-y-2 text-sm opacity-60">
                <li><Link href="#" className="hover:text-[#C4A05A]">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#C4A05A]">Terms of Service</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Certifications row */}
        {/* <div className="flex justify-start gap-8 flex-wrap py-8 border-t border-white/5 opacity-50 hover:opacity-80 transition-opacity duration-300">
          <Link href="/AE59602A_LIMINAL_ARC_TECHNICAL%20...pdf">
            <Image src="/9001.webp" width={80} height={80} alt="ISO 9001 Certificate" className="grayscale" />
          </Link>
          <Link href="/AE59602C-1_LIMINAL_ARC_TECHNICA...pdf">
            <Image src="/45001.webp" width={80} height={80} alt="Government E-Marketplace" className="grayscale" />
          </Link>
          <Link href="/AE59602B_LIMINAL_ARC_TECHNICAL.pdf">
            <Image src="/download.webp" width={80} height={80} alt="ISO 14001 Certificate" className="grayscale" />
          </Link>
        </div> */}

        {/* Footer bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-center  justify-center items-center gap-6 text-[#F5F0E8] opacity-35 text-[10px] uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Liminal Arc Interiors. All Rights Reserved.</p>
       
        </div>

      </div>
    </footer>
  );
}
