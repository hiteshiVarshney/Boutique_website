import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { boutiqueInfo } from '@/data/boutique';
import { sendContactMessage } from '@/api/client';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContactMessage(form);
      const waText = `Hello ${boutiqueInfo.name}, my name is ${form.name}. ${form.message}`;
      const waLink = `https://wa.me/${boutiqueInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`;
      window.open(waLink, '_blank');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const contactItems = [
    { icon: MapPin, label: 'Address', value: boutiqueInfo.address },
    { icon: Phone, label: 'Phone', value: boutiqueInfo.phone },
    { icon: Mail, label: 'Email', value: boutiqueInfo.email },
    { icon: Clock, label: 'Hours', value: boutiqueInfo.hours },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-ink-100/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
          <p className="text-xs uppercase tracking-ultra-wide text-rose-500">We'd love to hear from you</p>
          <h1 className="mt-2 font-serif text-5xl font-light text-ink-900 lg:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-ink-500">
            Whether you have a question about a piece, need styling advice, or want to plan
            a visit — we are just a message away.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-10">
              <h2 className="font-serif text-3xl font-light text-ink-900">Send a Message</h2>
              <p className="mt-2 text-sm text-ink-500">
                Fill out the form and we will continue the conversation on WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-3 text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-3 text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                    placeholder="jane@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-3 text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                    placeholder="I'd love to know more about..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3.5 text-sm uppercase tracking-wider text-white transition-all hover:bg-rose-600 hover:shadow-lg disabled:opacity-60"
                >
                  {status === 'success' ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Message sent!
                    </>
                  ) : status === 'error' ? (
                    <>
                      <AlertCircle className="h-5 w-5" />
                      Failed to send
                    </>
                  ) : status === 'sending' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send via WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>

          {/* Contact info + map */}
          <Reveal delay={150}>
            <div className="flex h-full flex-col gap-6">
              {/* Info card */}
              <div className="rounded-2xl bg-ink-900 p-8 text-white lg:p-10">
                <h2 className="font-serif text-3xl font-light">Visit or Call</h2>
                <ul className="mt-6 space-y-5">
                  {contactItems.map((item) => (
                    <li key={item.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-300">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-ink-400">{item.label}</p>
                        <p className="mt-0.5 text-sm text-white">{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <a
                  href={boutiqueInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm uppercase tracking-wider text-white transition-all hover:bg-[#1ebd5b] hover:shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Map */}
              <div className="flex-1 overflow-hidden rounded-2xl border border-ink-100">
                <iframe
                  title="Boutique location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.3364%2C48.8606%2C2.3464%2C48.8656&layer=mapnik&marker=48.8631%2C2.3414"
                  className="h-full min-h-[280px] w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
