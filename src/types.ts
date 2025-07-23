import type React from 'react';

export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
}

export interface ContentSectionData {
  id: string;
  title: string;
  description: string;
  details?: string[];
  images?: string[];
  type: 'hero' | 'intro' | 'feature' | 'gallery' | 'amenities' | 'location' | 'reviews' | 'cta';
}

export interface Amenity {
  name: string;
  icon: React.ReactNode;
}
