import { MessageCircle } from 'lucide-react';
import { boutiqueInfo } from '@/data/boutique';

export function WhatsAppButton() {
  return (
    <a
      href={boutiqueInfo.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-green-900/20 transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60" />
        <span className="relative h-4 w-4 rounded-full bg-[#25D366] border-2 border-white" />
      </span>
    </a>
  );
}
