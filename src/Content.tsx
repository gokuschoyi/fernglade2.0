import React, { useMemo, useRef, forwardRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CONTENT_DATA, SCROLL_PAGES, AMENITIES_LIST, REVIEWS_LIST } from './constants';
import type { ContentSectionData, Amenity } from './types';

import { FaWifi } from 'react-icons/fa';
import { LuTv } from 'react-icons/lu';
import { GiSparkles } from 'react-icons/gi';
import { BsFillPinMapFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';

interface SectionProps {
  section: ContentSectionData;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ section }, ref) => {
  const baseClasses = 'section'; // Base CSS class for section

  const renderContent = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="content">
            <h1 className="hero-title">{section.title}</h1>
            <p className="hero-description">{section.description}</p>
          </div>
        );
      case 'intro':
        return (
          <div className="content">
            <h2 className="intro-title">{section.title}</h2>
            <p className="intro-description">{section.description}</p>
            <div className="details">
              {section.details?.map((detail) => (
                <span key={detail}>{detail}</span>
              ))}
            </div>
          </div>
        );
      case 'feature':
        return (
          <div>
            <h2 className="feature-title">{section.title}</h2>
            <p className="feature-description">{section.description}</p>
            <div className="grid">
              {section.images?.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${section.title} ${i + 1}`}
                  className="feature-image"
                />
              ))}
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div>
            <h2 className="gallery-title">{section.title}</h2>
            <p className="gallery-description">{section.description}</p>
            <div className="grid">
              {section.images?.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${section.title} ${i + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          </div>
        );
      case 'amenities':
        return (
          <div className="content">
            <h2 className="amenities-title">{section.title}</h2>
            <p className="amenities-description">{section.description}</p>
            <div className="grid">
              {AMENITIES_LIST.map((amenity: Amenity) => (
                <div key={amenity.name} className="amenity">
                  {/* <amenity.icon className="amenity-icon" /> */}
                  <span className="amenity-name">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="content">
            <h2 className="location-title">{section.title}</h2>
            <p className="location-description">{section.description}</p>
            <p className="location-details">{section.details?.[0]}</p>
          </div>
        );
      case 'reviews':
        return (
          <div>
            <h2 className="reviews-title">{section.title}</h2>
            <div className="grid">
              {REVIEWS_LIST.map((review: { name: string; rating: number; text: string }) => (
                <div key={review.name} className="review">
                  <div className="rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <GiSparkles key={i} className="star-icon" />
                    ))}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <p className="name">- {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'cta':
        return (
          <div className="content">
            <h2 className="cta-title">{section.title}</h2>
            <p className="cta-description">{section.description}</p>
            <button className="cta-button">Book Your Stay</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={ref}
      className={`${baseClasses} ${section.type}`}
      style={{
        height: section.type === 'hero' || section.type === 'cta' ? '100vh' : 'auto',
        minHeight: '80vh',
      }}
    >
      {renderContent()}
    </section>
  );
});

export default Section;

export const Content = () => {
  const sectionRefs = useMemo(
    () => Array.from({ length: CONTENT_DATA.length }, () => React.createRef<HTMLDivElement>()),
    [],
  );

  const scroll = useScroll();

  useFrame(() => {
    const scrollOffset = scroll.offset;
    const numSections = CONTENT_DATA.length;
    const activeZone = 1 / SCROLL_PAGES;

    sectionRefs.forEach((ref, index) => {
      if (ref.current) {
        const sectionTop = index / (numSections - 1);
        const distance = Math.abs(scrollOffset - sectionTop);

        const rawOpacity = Math.max(0, 1 - distance / activeZone);

        const minOpacity = 0.2;
        const opacity = minOpacity + (1 - minOpacity) * Math.pow(rawOpacity, 1.5);

        ref.current.style.opacity = `${opacity}`;
        ref.current.setAttribute('aria-hidden', opacity < 0.21 ? 'true' : 'false');
      }
    });
  });

  return (
    <div className="w-full text-white">
      {CONTENT_DATA.map((section: ContentSectionData, index: number) => (
        <Section key={section.id} section={section} ref={sectionRefs[index]} />
      ))}
    </div>
  );
};
