import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';
import { defaultBlogs, BLOG_CATEGORIES, getCategoryLabel } from '../../data/defaultBlogs';
import {
  Sparkles,
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Tag,
} from 'lucide-react';
import Button from '../../components/Button/Button';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = defaultBlogs.find((b) => b.featured) ?? defaultBlogs[0];
  const showFeatured = !searchQuery && activeCategory === 'all' && featuredPost;

  const filteredPosts = useMemo(() => {
    return defaultBlogs.filter((post) => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const listPosts = useMemo(() => {
    if (showFeatured) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, showFeatured, featuredPost]);

  const trending = [...defaultBlogs]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 4);

  const allTags = [...new Set(defaultBlogs.flatMap((b) => b.tags))];

  return (
    <div className="blog-page">
      <div className="blog-page__bg" aria-hidden="true">
        <div className="blog-page__orb blog-page__orb--1" />
        <div className="blog-page__orb blog-page__orb--2" />
        <div className="blog-page__orb blog-page__orb--3" />
        <div className="blog-page__bg-pattern" />
      </div>

      <div className="blog-page__container container">
        <header className="blog-page__header">
          <div className="blog-page__tag">
            <Sparkles size={14} className="blog-page__tag-icon" />
            <span>INSIGHTS & STORIES</span>
          </div>
          <h1 className="blog-page__title">
            The Lux Motors <span className="blog-page__title-gradient">Journal</span>
          </h1>
          <p className="blog-page__subtitle">
            Expert guides, fleet spotlights, and UAE driving wisdom from Dubai&apos;s premier
            exotic rental house.
          </p>
        </header>

        {showFeatured && (
          <Link to={`/blog/${featuredPost.slug}`} className="blog-hero glass-panel">
            <div className="blog-hero__media">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="blog-hero__image"
                loading="eager"
              />
              <div className="blog-hero__shade" />
              <span className="blog-hero__badge">
                <Sparkles size={12} />
                Featured Story
              </span>
            </div>
            <div className="blog-hero__body">
              <div className="blog-hero__meta">
                <span className="blog-hero__category">{getCategoryLabel(featuredPost.category)}</span>
                <span className="blog-hero__sep">·</span>
                <span className="blog-hero__read">
                  <Clock size={13} />
                  {featuredPost.readTimeMinutes} min read
                </span>
                <span className="blog-hero__sep">·</span>
                <span>{formatDate(featuredPost.publishedAt)}</span>
              </div>
              <h2 className="blog-hero__title">{featuredPost.title}</h2>
              <p className="blog-hero__excerpt">{featuredPost.excerpt}</p>
              <span className="blog-hero__cta">
                Read Full Article
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        )}

        <div className="blog-page__toolbar glass-panel">
          <nav className="blog-page__categories" aria-label="Blog categories">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`blog-page__cat-btn ${activeCategory === cat.id ? 'blog-page__cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {activeCategory === cat.id && <Sparkles size={12} />}
                <span>{cat.label}</span>
              </button>
            ))}
          </nav>
          <div className="blog-page__search glass">
            <Search size={16} className="blog-page__search-icon" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-page__search-input"
              aria-label="Search blog articles"
            />
          </div>
        </div>

        <div className="blog-page__section-header">
          <span className="blog-page__section-label">Latest Articles</span>
          <h2 className="blog-page__section-title">
            From the <span className="blog-page__section-accent">Editorial Desk</span>
          </h2>
        </div>

        <div className="blog-page__body">
          <section className="blog-page__main" aria-label="Blog articles">
            {listPosts.length === 0 ? (
              <div className="blog-page__empty glass-panel">
                <BookOpen size={32} />
                <p>No articles match your search. Try a different category or keyword.</p>
                <button
                  type="button"
                  className="blog-page__clear-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="blog-page__posts-grid">
                {listPosts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card glass-panel">
                    <div className="blog-card__image-wrap">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="blog-card__image"
                        loading="lazy"
                      />
                      <div className="blog-card__shade" />
                      <span className="blog-card__category-badge">
                        {getCategoryLabel(post.category)}
                      </span>
                    </div>
                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        <span className="blog-card__read-time">
                          <Clock size={12} />
                          {post.readTimeMinutes} min
                        </span>
                        <span className="blog-card__dot">·</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <h3 className="blog-card__title">{post.title}</h3>
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                      <span className="blog-card__link">
                        Read more
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <aside className="blog-page__sidebar" aria-label="Blog sidebar">
            <div className="blog-sidebar__block glass-panel">
              <div className="blog-sidebar__heading">
                <TrendingUp size={16} />
                <span>Trending Now</span>
              </div>
              <ol className="blog-sidebar__trending">
                {trending.map((post, idx) => (
                  <li key={post.id}>
                    <Link to={`/blog/${post.slug}`} className="blog-sidebar__trend-item">
                      <span className="blog-sidebar__trend-num">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="blog-sidebar__trend-title">{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="blog-sidebar__block glass-panel">
              <div className="blog-sidebar__heading">
                <Tag size={16} />
                <span>Popular Tags</span>
              </div>
              <div className="blog-sidebar__tags">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="blog-sidebar__tag"
                    onClick={() => setSearchQuery(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="blog-sidebar__cta glass-panel">
              <h3 className="blog-sidebar__cta-title">Ready to Drive?</h3>
              <p className="blog-sidebar__cta-text">
                Turn inspiration into experience. Browse our exotic fleet and book in minutes.
              </p>
              <Button href="/fleet" variant="primary" size="sm" icon>
                View Fleet
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
