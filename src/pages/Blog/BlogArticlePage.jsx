import { useEffect, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import './BlogArticlePage.css';
import { defaultBlogs, getBlogBySlug, getCategoryLabel } from '../../data/defaultBlogs';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  ArrowRight,
} from 'lucide-react';
import Button from '../../components/Button/Button';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function renderContent(content) {
  const blocks = content.split('\n\n');
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('## ')) {
      return <h2 key={i} className="blog-article__h2">{trimmed.slice(3)}</h2>;
    }
    if (trimmed.startsWith('### ')) {
      return <h3 key={i} className="blog-article__h3">{trimmed.slice(4)}</h3>;
    }
    if (trimmed.startsWith('> ')) {
      return (
        <blockquote key={i} className="blog-article__quote glass-widget">
          {trimmed.slice(2)}
        </blockquote>
      );
    }
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').map((line) => line.replace(/^- /, ''));
      return (
        <ul key={i} className="blog-article__list">
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').map((line) => line.replace(/^\d+\.\s/, ''));
      return (
        <ol key={i} className="blog-article__list blog-article__list--ordered">
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      );
    }
    return <p key={i} className="blog-article__p">{trimmed}</p>;
  });
}

export default function BlogArticlePage() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  const related = useMemo(() => {
    if (!post) return [];
    return defaultBlogs
      .filter((b) => b.slug !== post.slug && (b.category === post.category || b.tags.some((t) => post.tags.includes(t))))
      .slice(0, 3);
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      const bar = document.getElementById('blog-reading-progress');
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="blog-article-page">
      <div id="blog-reading-progress" className="blog-article-page__progress" aria-hidden="true" />

      <div className="blog-article-page__bg">
        <div className="blog-article-page__orb blog-article-page__orb--1" />
        <div className="blog-article-page__orb blog-article-page__orb--2" />
        <div className="blog-article-page__grid" />
      </div>

      <div className="blog-article-page__container container">
        <Link to="/blog" className="blog-article-page__back glass">
          <ArrowLeft size={16} />
          Back to Journal
        </Link>

        <header className="blog-article-page__header">
          <div className="blog-article-page__meta">
            <span className="blog-article-page__category">{getCategoryLabel(post.category)}</span>
            <span className="blog-article-page__meta-dot">·</span>
            <span className="blog-article-page__meta-item">
              <Clock size={14} />
              {post.readTimeMinutes} min read
            </span>
            <span className="blog-article-page__meta-dot">·</span>
            <span className="blog-article-page__meta-item">
              <Calendar size={14} />
              {formatDate(post.publishedAt)}
            </span>
          </div>
          <h1 className="blog-article-page__title">{post.title}</h1>
          <p className="blog-article-page__author">By {post.author.name}</p>
        </header>

        <div className="blog-article-page__hero glass-panel">
          <img src={post.coverImage} alt={post.title} className="blog-article-page__hero-img" />
        </div>

        <div className="blog-article-page__body-wrap">
          <article className="blog-article__content glass-panel">
            <p className="blog-article__lead">{post.excerpt}</p>
            {renderContent(post.content)}
          </article>
        </div>

        <div className="blog-article-page__tags">
          <Tag size={14} />
          {post.tags.map((tag) => (
            <span key={tag} className="blog-article-page__tag">#{tag}</span>
          ))}
        </div>

        {related.length > 0 && (
          <section className="blog-article-page__related">
            <div className="blog-article-page__related-header">
              <span className="section-label">Continue Reading</span>
              <h2 className="section-title">
                Related <span className="accent">Articles</span>
              </h2>
            </div>
            <div className="blog-article-page__related-grid">
              {related.map((item) => (
                <Link key={item.id} to={`/blog/${item.slug}`} className="blog-related-card glass-panel">
                  <img src={item.coverImage} alt={item.title} className="blog-related-card__img" loading="lazy" />
                  <div className="blog-related-card__body">
                    <span className="blog-related-card__cat">{getCategoryLabel(item.category)}</span>
                    <h3 className="blog-related-card__title">{item.title}</h3>
                    <span className="blog-related-card__link">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="blog-article-page__cta glass-panel">
          <h2 className="blog-article-page__cta-title">Ready to Experience It?</h2>
          <p className="blog-article-page__cta-text">
            Browse our exotic fleet and book your dream car with doorstep delivery across the UAE.
          </p>
          <div className="blog-article-page__cta-actions">
            <Button href="/fleet" variant="primary" icon>
              View Fleet
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
