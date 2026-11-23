"use client";
import { useEffect, useState } from "react";
/**
 * 型
 */
type Content = {
  id: string;
  name: string;
  body: string;
};
type Phase = "idle" | "sending" | "done";

const CLOSE_TIME = 3000;

/**
 * 共通スタイル
 */
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5C63] focus-visible:ring-offset-2";
const fieldCls = `w-full rounded-sm border border-[#B9C3CC] bg-white px-3 py-2 text-sm text-[#1F2A33] placeholder:text-[#8A96A0] ${focusRing}`;
const labelCls = "block text-sm font-medium";
const btnBase = `inline-flex items-center justify-center rounded-sm text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;
const btnPrimary = `${btnBase} bg-[#1D5C63] px-5 py-2 text-white hover:bg-[#164A50]`;

/**
 * ダミーデータ
 */
const INITIAL: Content[] = [
  {
    id: "C-0001",
    name: "会社概要ページ",
    body: "沿革・所在地・代表挨拶を掲載するページ。",
  },
  {
    id: "C-0002",
    name: "採用情報 2027年度",
    body: "新卒・中途の募集要項と応募フォームへの導線。",
  },
  {
    id: "C-0003",
    name: "年末年始の営業について",
    body: "12/29〜1/3は休業。問い合わせは1/4以降に順次対応。",
  },
];

/**
 * ダミーAPI
 */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const dummyApi = {
  async create(c: Content) {
    await wait(500);
    return c;
  },
  async update(c: Content) {
    await wait(500);
    return c;
  },
  async remove(id: string) {
    await wait(500);
    return id;
  },
};

/**
 * フォーム画面
 */
export default function CreateForm() {
  const [items, setItems] = useState<Content[]>(INITIAL);

  // 登録フォーム
  const [form, setForm] = useState<Content>({ id: "", name: "", body: "" });
  const [formError, setFormError] = useState("");
  const [formPhase, setFormPhase] = useState<Phase>("idle");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), CLOSE_TIME);
    return () => clearTimeout(t);
  }, [notice]);

  /* ---------- 登録 ---------- */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id.trim();
    const name = form.name.trim();
    if (!id || !name) {
      setFormError("IDとコンテンツ名を入力してください。");
      return;
    }
    if (items.some((i) => i.id === id)) {
      setFormError(
        `ID「${id}」はすでに使われています。別のIDを入力してください。`,
      );
      return;
    }
    setFormError("");
    setFormPhase("sending");
    const created = await dummyApi.create({ id, name, body: form.body.trim() });
    setItems((prev) => [created, ...prev]);
    setForm({ id: "", name: "", body: "" });
    setFormPhase("idle");
    setNotice(`「${created.name}」を登録しました。`);
  };

  return (
    <section aria-labelledby="create-heading">
      <h2 id="create-heading" className="mb-3 text-base font-bold">
        新規登録
      </h2>
      <form
        onSubmit={handleCreate}
        className="grid gap-5 border-l-4 border-[#1D5C63] bg-white p-5 sm:grid-cols-[12rem_1fr] sm:p-6"
      >
        <div className="space-y-1.5">
          <label htmlFor="new-id" className={labelCls}>
            ID
          </label>
          <input
            id="new-id"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            placeholder="C-0004"
            autoComplete="off"
            className={`${fieldCls} font-medium tabular-nums`}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="new-name" className={labelCls}>
            コンテンツ名
          </label>
          <input
            id="new-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="例：新サービスのお知らせ"
            className={fieldCls}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="new-body" className={labelCls}>
            コンテンツ内容
          </label>
          <textarea
            id="new-body"
            rows={4}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            placeholder="本文や概要を入力"
            className={`${fieldCls} resize-y`}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>【登録状況】</label>
          <div className={labelCls}>{notice === "" ? "登録可能" : notice}</div>
        </div>
        <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p role="alert" className="text-sm text-[#B42828]">
            {formError}
          </p>
          <button
            type="submit"
            disabled={formPhase === "sending"}
            className={btnPrimary}
          >
            {formPhase === "sending" ? "登録中…" : "登録する"}
          </button>
        </div>
      </form>
    </section>
  );
}
