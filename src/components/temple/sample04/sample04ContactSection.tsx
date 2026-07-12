"use client";
import { useState } from "react";
export default function Sample04ContactSection() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <section id="お問い合わせ" className="py-20 bg-gray-50">
      <div className="max-w-[640px] mx-auto px-6">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2 text-center">
          Contact
        </p>
        <h2 className="text-2xl font-bold text-black mb-3 text-center">
          お問い合わせ
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8 leading-relaxed">
          ご質問・ご相談・お見積もりはこちらのフォームよりお気軽にご連絡ください。
          <br />
          担当者より2〜3営業日以内にご連絡いたします。
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              お名前 <span className="text-red-500 ml-1">必須</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handle}
              placeholder="山田 太郎"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">会社名</label>
            <input
              name="company"
              value={form.company}
              onChange={handle}
              placeholder="株式会社〇〇"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              メールアドレス <span className="text-red-500 ml-1">必須</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              placeholder="example@domain.co.jp"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              電話番号{" "}
              <span className="text-gray-400 ml-1 font-normal">任意</span>
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handle}
              placeholder="090-1234-5678"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              お問い合わせ内容 <span className="text-red-500 ml-1">必須</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handle}
              rows={5}
              placeholder="お問い合わせ内容をご記入ください"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              checked={form.privacy}
              onChange={handle}
              className="mt-0.5"
            />
            <label
              htmlFor="privacy"
              className="text-xs text-gray-600 leading-relaxed"
            >
              <a href="#" className="underline">
                プライバシーポリシー
              </a>{" "}
              に同意して送信する
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            送信する ↗
          </button>
        </form>
      </div>
    </section>
  );
}
