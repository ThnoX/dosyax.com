/** Haber metnini okunabilir paragraflara böler (düz duvar metin → satır/cümle grupları). */
export function splitArticleParagraphs(raw) {
  let text = String(raw || '')
    .replace(/\r\n/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  if (!text) return [];

  let blocks = text
    .split(/\n{2,}|\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  // Tek uzun bloksa cümlelere ayırıp 2–3 cümlelik paragraflar kur
  const out = [];
  for (const block of blocks) {
    if (block.length < 260) {
      out.push(block);
      continue;
    }
    const sentences = block.match(/[^.!?…]+(?:[.!?…]+|$)/g) || [block];
    let buf = '';
    let count = 0;
    for (const s of sentences) {
      const t = s.trim();
      if (!t) continue;
      if (!buf) {
        buf = t;
        count = 1;
        continue;
      }
      const next = `${buf} ${t}`;
      if (count < 3 && next.length < 420) {
        buf = next;
        count += 1;
      } else {
        out.push(buf);
        buf = t;
        count = 1;
      }
    }
    if (buf) out.push(buf);
  }

  return out;
}
