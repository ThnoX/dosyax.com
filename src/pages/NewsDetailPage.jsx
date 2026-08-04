import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate, publicApi } from '../lib/api';
import { splitArticleParagraphs } from '../lib/articleText';
import { EmptyState } from '../components/ui';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    publicApi(`/news/${id}`)
      .then((data) => setArticle(data.article))
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div>
        <p className="mb-4 text-sm text-danger">{error}</p>
        <Link to="/haberler" className="text-accent hover:underline">
          ← Haberlere dön
        </Link>
      </div>
    );
  }

  if (!article) {
    return <EmptyState>Yükleniyor…</EmptyState>;
  }

  const paragraphs = splitArticleParagraphs(article.content || article.summary || '');

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/haberler" className="mb-6 inline-block text-sm text-ink-soft hover:text-accent">
        ← Haberlere dön
      </Link>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {article.source_name}
      </p>
      <h1 className="font-display text-3xl leading-tight break-words text-ink sm:text-4xl md:text-5xl">
        {article.title}
      </h1>
      <p className="mt-3 text-sm text-ink-soft">{formatDate(article.published_at)}</p>

      {article.image_url ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-panel-2 sm:mt-8">
          <img
            src={article.image_url}
            alt=""
            className="max-h-[480px] w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}

      <div className="mt-6 space-y-4 text-[15px] leading-relaxed break-words text-ink/90 sm:mt-8 sm:text-base">
        {paragraphs.length ? (
          paragraphs.map((p, i) => <p key={`${i}-${p.slice(0, 24)}`}>{p}</p>)
        ) : (
          <p className="text-ink-soft">Bu haber için metin özeti bulunamadı.</p>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-panel/70 p-4 sm:mt-10 sm:p-5">
        <p className="text-xs uppercase tracking-wide text-ink-soft">Kaynak</p>
        <p className="mt-1 font-medium break-words text-ink">{article.source_name}</p>
        {article.source_url ? (
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex break-all text-sm font-semibold text-accent hover:underline"
          >
            Orijinal haberi oku →
          </a>
        ) : null}
      </div>
    </article>
  );
}
