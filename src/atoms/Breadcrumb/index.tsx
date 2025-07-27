import React from 'react';
import { iBreadcrumb, iBreadcrumbData } from '../../interfaces/atoms';

const findCategoryPath = (
    categories: iBreadcrumbData[],
    targetId: number,
    path: iBreadcrumbData[] = []
  ): iBreadcrumbData[] | null => {
    for (const category of categories) {
      const newPath = [...path, category];
      if (category.id === targetId) return newPath;
  
      if (category.children) {
        const result = findCategoryPath(category.children, targetId, newPath);
        if (result) return result;
      }
    }
    return null;
  };

export const Breadcrumb: React.FC<iBreadcrumb> = ({ data, selectedId }) => {
  const path = findCategoryPath(data, selectedId) || [];

  return (
    <nav aria-label="breadcrumb" >
      {path.map((item, idx) => (
        <p key={item.id}>
          {item.name}
          {idx < path.length - 1 && ' > '}
        </p>
      ))}
    </nav>
  );
};
