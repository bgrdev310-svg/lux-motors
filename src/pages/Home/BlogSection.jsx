import './BlogSection.css';
import { defaultBlogs, getCategoryLabel } from '../../data/defaultBlogs';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogSection() {
  const sectionRef = useScrollReveal();
  
  // Get the first two blogs for the homepage section
  const blogsToShow = defaultBlogs.slice(0, 2);

  return (
    <section className="blog-section section" id="blog-section" ref={sectionRef}>
      <div className="container">
        <div className="blog-section__header reveal">
          <div>
            <span className="section-label">Insights & Stories</span>
            <h2 className="section-title">
              The Lux Motors <span className="accent">Journal</span>
            </h2>
            <p className="blog-section__subtitle">
              Expert guides, fleet spotlights, and UAE driving wisdom from Dubai's premier exotic rental house.
            </p>
          </div>
          <Button
            variant="secondary"
            icon
            href="/blog"
            className="blog-section__cta reveal reveal-delay-2"
          >
            View All Stories
          </Button>
        </div>

        <div className="blog-section__grid">
          {blogsToShow.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`blog-section__card glass-panel reveal reveal-delay-${index + 1}`}
            >
              {/* Card visual elements */}
              <div className="blog-section__card-liquid-blob-1" />
              <div className="blog-section__card-liquid-blob-2" />

              <div className="blog-section__card-image-wrap">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="blog-section__card-image"
                  loading="lazy"
                />
                <div className="blog-section__card-shade" />
                <span className="blog-section__card-category">
                  {getCategoryLabel(post.category)}
                </span>
              </div>

              <div className="blog-section__card-body">
                <div className="blog-section__card-meta">
                  <span className="blog-section__card-read-time">
                    <Clock size={13} />
                    {post.readTimeMinutes} min read
                  </span>
                  <span className="blog-section__card-dot">·</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                
                <h3 className="blog-section__card-title">{post.title}</h3>
                <p className="blog-section__card-excerpt">{post.excerpt}</p>
                
                <div className="blog-section__card-footer">
                  <span className="blog-section__card-link-text">Read Full Article</span>
                  <div className="blog-section__card-arrow-circle">
                    <ArrowRight size={14} className="blog-section__card-arrow" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
