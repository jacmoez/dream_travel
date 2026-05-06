import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center flex-wrap gap-4 mb-6">
          <a
            href="https://wa.me/8562012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full p-3 hover:scale-110 transition w-12 h-12 flex items-center justify-center"
          >
            <i className="fab fa-whatsapp text-2xl" style={{ color: "#2E7D32" }}></i>
          </a>

          <a
            href="https://tiktok.com/@dreamdestination"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1A1A1A] rounded-full p-3 hover:scale-110 transition w-12 h-12 flex items-center justify-center"
          >
            <i className="fab fa-tiktok text-2xl text-white"></i>
          </a>

          <a
            href="https://facebook.com/dreamdestination"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] rounded-full p-3 hover:scale-110 transition w-12 h-12 flex items-center justify-center"
          >
            <i className="fab fa-facebook-f text-2xl text-white"></i>
          </a>

          <a
            href="https://instagram.com/dreamdestination"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#FCAF45] rounded-full p-3 hover:scale-110 transition w-12 h-12 flex items-center justify-center"
          >
            <i className="fab fa-instagram text-2xl text-white"></i>
          </a>

          <a
            href="https://youtube.com/@dreamdestination"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF0000] rounded-full p-3 hover:scale-110 transition w-12 h-12 flex items-center justify-center"
          >
            <i className="fab fa-youtube text-2xl text-white"></i>
          </a>

          <a
            href="https://linkedin.com/company/dreamdestination"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A66C2] rounded-full p-3 hover:scale-110 transition w-12 h-12 flex items-center justify-center"
          >
            <i className="fab fa-linkedin-in text-2xl text-white"></i>
          </a>
        </div>

        <div className="text-center text-sm text-white/70">
          <p>© 2026 Dream Destination Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;