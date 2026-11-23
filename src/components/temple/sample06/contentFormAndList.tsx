"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { IBM_Plex_Sans_JP } from "next/font/google";

const plex = IBM_Plex_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
/**
 * 型
 */
type Content = {
  id: string;
  name: string;
  body: string;
};
type Phase = "idle" | "sending" | "done";

// 登録状況切替・モーダルが閉じる時間
const CLOSE_TIME = 3000;

type ModalState =
  | { type: "none" }
  | { type: "edit"; target: Content }
  | { type: "delete"; target: Content };

/**
 * 共通スタイル
 */
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5C63] focus-visible:ring-offset-2";
const fieldCls = `w-full rounded-sm border border-[#B9C3CC] bg-white px-3 py-2 text-sm text-[#1F2A33] placeholder:text-[#8A96A0] ${focusRing}`;
const labelCls = "block text-sm font-medium";
const btnBase = `inline-flex items-center justify-center rounded-sm text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;
const btnPrimary = `${btnBase} bg-[#1D5C63] px-5 py-2 text-white hover:bg-[#164A50]`;
const btnDanger = `${btnBase} bg-[#B42828] px-5 py-2 text-white hover:bg-[#962020]`;
const btnOutline = `${btnBase} border border-[#B9C3CC] bg-white px-4 py-2 hover:bg-[#F2F4F6]`;
const btnSmall = `${btnBase} border px-3 py-1`;
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
 * フォーム画面＆コンテンツリスト画面
 */
export default function ContentFormAndList() {
  const [items, setItems] = useState<Content[]>(INITIAL);

  // 登録フォーム
  const [form, setForm] = useState<Content>({ id: "", name: "", body: "" });
  const [formError, setFormError] = useState("");
  const [formPhase, setFormPhase] = useState<Phase>("idle");
  const [notice, setNotice] = useState("");

  // モーダル
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [draft, setDraft] = useState<Content>({ id: "", name: "", body: "" });
  const [modalPhase, setModalPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), CLOSE_TIME);
    return () => clearTimeout(t);
  }, [notice]);

  const closeModal = () => {
    setModal({ type: "none" });
    setModalPhase("idle");
  };
  const requestClose = () => {
    if (modalPhase !== "sending") closeModal();
  };

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

  /* ---------- 編集 ---------- */
  const openEdit = (c: Content) => {
    setDraft(c);
    setModalPhase("idle");
    setModal({ type: "edit", target: c });
  };

  const handleUpdate = async () => {
    if (!draft.name.trim()) return;
    setModalPhase("sending");
    const updated = await dummyApi.update({
      ...draft,
      name: draft.name.trim(),
    });
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setModalPhase("done");
    setTimeout(closeModal, CLOSE_TIME);
  };

  /* ---------- 削除 ---------- */
  const openDelete = (c: Content) => {
    setModalPhase("idle");
    setModal({ type: "delete", target: c });
  };

  const handleDelete = async () => {
    if (modal.type !== "delete") return;
    setModalPhase("sending");
    const id = await dummyApi.remove(modal.target.id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    setModalPhase("done");
    setTimeout(closeModal, CLOSE_TIME);
  };

  return (
    <>
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
            <div className={labelCls}>
              {notice === "" ? "登録可能" : notice}
            </div>
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
      <section aria-labelledby="list-heading">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="list-heading" className="text-base font-bold">
            コンテンツ一覧
          </h2>
          <p
            role="status"
            aria-live="polite"
            className={`rounded-sm bg-[#DCEBE5] px-3 py-1 text-sm text-[#1D5C63] transition-opacity motion-reduce:transition-none ${
              notice ? "opacity-100" : "opacity-0"
            }`}
          >
            {notice || " "}
          </p>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-[#1F2A33] text-left">
                <th scope="col" className="w-32 px-4 py-3 font-bold">
                  ID
                </th>
                <th scope="col" className="px-4 py-3 font-bold">
                  コンテンツ名
                </th>
                <th scope="col" className="w-48 px-4 py-3 text-right font-bold">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-12 text-center text-[#5B6873]"
                  >
                    コンテンツはまだありません。上のフォームから登録してください。
                  </td>
                </tr>
              ) : (
                items.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[#E1E6EA] last:border-b-0 hover:bg-[#F6F8F9]"
                  >
                    <td className="px-4 py-3 font-medium tabular-nums text-[#1D5C63]">
                      {c.id}
                    </td>
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="space-x-2 whitespace-nowrap px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => openEdit(c)}
                        className={`${btnSmall} border-[#B9C3CC] bg-white hover:bg-[#F2F4F6]`}
                        aria-label={`${c.name}を編集`}
                      >
                        編集
                      </button>
                      <button
                        type="button"
                        onClick={() => openDelete(c)}
                        className={`${btnSmall} border-[#E3B9B9] bg-white text-[#B42828] hover:bg-[#FBEFEF]`}
                        aria-label={`${c.name}を削除`}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      {/* ---------------- 編集モーダル ---------------- */}
      <Modal
        open={modal.type === "edit"}
        onClose={requestClose}
        labelledBy="edit-title"
        className={plex.className}
      >
        {modalPhase === "done" ? (
          <DoneMessage id="edit-title" text="更新しました。" />
        ) : (
          <>
            <h2 id="edit-title" className="text-lg font-bold">
              コンテンツを編集
            </h2>
            <p className="mt-1 text-sm text-[#5B6873]">ID {draft.id}</p>
            <div className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="edit-name" className={labelCls}>
                  コンテンツ名
                </label>
                <input
                  id="edit-name"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className={fieldCls}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="edit-body" className={labelCls}>
                  コンテンツ内容
                </label>
                <textarea
                  id="edit-body"
                  rows={5}
                  value={draft.body}
                  onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                  className={`${fieldCls} resize-y`}
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                disabled={modalPhase === "sending"}
                className={btnOutline}
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={modalPhase === "sending" || !draft.name.trim()}
                className={btnPrimary}
              >
                {modalPhase === "sending" ? "更新中…" : "更新する"}
              </button>
            </div>
          </>
        )}
      </Modal>
      {/* ---------------- 削除モーダル ---------------- */}
      <Modal
        open={modal.type === "delete"}
        onClose={requestClose}
        labelledBy="delete-title"
        className={plex.className}
      >
        {modalPhase === "done" ? (
          <DoneMessage id="delete-title" text="削除しました。" />
        ) : (
          modal.type === "delete" && (
            <>
              <h2 id="delete-title" className="text-lg font-bold">
                このコンテンツを削除しますか？
              </h2>
              <p className="mt-1 text-sm text-[#5B6873]">
                削除したコンテンツは元に戻せません。
              </p>
              <dl className="mt-5 grid grid-cols-[6rem_1fr] gap-y-1 border-l-4 border-[#B42828] bg-[#FBEFEF] px-4 py-3 text-sm">
                <dt className="text-[#5B6873]">ID</dt>
                <dd className="font-medium tabular-nums">{modal.target.id}</dd>
                <dt className="text-[#5B6873]">コンテンツ名</dt>
                <dd className="font-medium">{modal.target.name}</dd>
              </dl>
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={modalPhase === "sending"}
                  className={btnOutline}
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={modalPhase === "sending"}
                  className={btnDanger}
                >
                  {modalPhase === "sending" ? "削除中…" : "削除する"}
                </button>
              </div>
            </>
          )
        )}
      </Modal>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* モーダル                                                 */
/*  - Esc / 背景クリック / × で onClose                                */
/*  - 開いたらパネルにフォーカス、閉じたら元の要素へ戻す                */
/*  - Tab キーをモーダル内に閉じ込める                                 */
/* ------------------------------------------------------------------ */
function Modal({
  open,
  onClose,
  labelledBy,
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  // onClose は毎レンダー作り直されるため ref 経由で参照（effect の再実行でフォーカスが飛ぶのを防ぐ）
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[#1F2A33]/50"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-sm bg-white p-6 text-[#1F2A33] shadow-xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className={`absolute right-3 top-3 h-8 w-8 rounded-sm text-xl leading-none text-[#5B6873] hover:bg-[#F2F4F6] ${focusRing}`}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

/** モーダル内の完了表示 */
function DoneMessage({ id, text }: { id: string; text: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-8">
      <span
        aria-hidden
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCEBE5] text-2xl text-[#1D5C63]"
      >
        ✓
      </span>
      <h2 id={id} className="text-base font-bold">
        {text}
      </h2>
      <p className="text-sm text-[#5B6873]">まもなく画面が閉じます。</p>
    </div>
  );
}
