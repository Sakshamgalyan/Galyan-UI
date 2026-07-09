'use client';

import React, { useState, useRef } from 'react';
import './dragdrop.css';

// ── Reorderable List ────────────────────────────────────────────────────────
export interface ReorderListProps<T> {
  items: T[];
  onReorder: (newItems: T[]) => void;
  keyExtractor: (item: T) => string;
  renderItem: (item: T, isDragging: boolean) => React.ReactNode;
  className?: string;
}

export function ReorderList<T>({ items, onReorder, keyExtractor, renderItem, className = '' }: ReorderListProps<T>) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number, e: React.DragEvent) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', idx.toString());
  };

  const handleDragOver = (idx: number, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (idx !== dragOverIdx) setDragOverIdx(idx);
  };

  const handleDrop = (idx: number, e: React.DragEvent) => {
    e.preventDefault();
    const fromIdx = Number(e.dataTransfer.getData('text/plain'));
    if (fromIdx !== idx) {
      const next = [...items];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(idx, 0, moved);
      onReorder(next);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  return (
    <div className={`gy-dnd-list ${className}`}>
      {items.map((item, idx) => {
        const isDragging = draggedIdx === idx;
        const isOver = dragOverIdx === idx;
        return (
          <div
            key={keyExtractor(item)}
            className={[
              'gy-dnd-item',
              isDragging ? 'gy-dnd-item--dragging' : '',
              isOver && !isDragging ? 'gy-dnd-item--drag-over' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            draggable
            onDragStart={(e) => handleDragStart(idx, e)}
            onDragOver={(e) => handleDragOver(idx, e)}
            onDragLeave={() => setDragOverIdx(null)}
            onDrop={(e) => handleDrop(idx, e)}
            onDragEnd={() => { setDraggedIdx(null); setDragOverIdx(null); }}
          >
            <div className="gy-dnd-handle" aria-hidden="true">
              <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
                <circle cx="4" cy="4" r="1.5" /><circle cx="8" cy="4" r="1.5" />
                <circle cx="4" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" />
                <circle cx="4" cy="12" r="1.5" /><circle cx="8" cy="12" r="1.5" />
              </svg>
            </div>
            <div className="gy-dnd-item-content">
              {renderItem(item, isDragging)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Kanban Board ─────────────────────────────────────────────────────────────
export interface KanbanColumnDef<T> {
  id: string;
  title: string;
  items: T[];
}

export interface KanbanBoardProps<T> {
  columns: KanbanColumnDef<T>[];
  onMove: (itemKey: string, fromCol: string, toCol: string, toIndex: number) => void;
  keyExtractor: (item: T) => string;
  renderCard: (item: T, isDragging: boolean) => React.ReactNode;
  className?: string;
}

export function KanbanBoard<T>({ columns, onMove, keyExtractor, renderCard, className = '' }: KanbanBoardProps<T>) {
  const [dragged, setDragged] = useState<{ key: string; colId: string; idx: number } | null>(null);
  const [overCol, setOverCol] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, key: string, colId: string, idx: number) => {
    setDragged({ key, colId, idx });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ key, colId }));
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (overCol !== colId) setOverCol(colId);
  };

  const handleDrop = (e: React.DragEvent, toCol: string, toIndex: number) => {
    e.preventDefault();
    setOverCol(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.colId === toCol && data.key === dragged?.key && toIndex === dragged?.idx) {
        // dropped in same place
        return;
      }
      onMove(data.key, data.colId, toCol, toIndex);
    } catch (err) {}
    setDragged(null);
  };

  return (
    <div className={`gy-kanban ${className}`}>
      {columns.map((col) => (
        <div key={col.id} className="gy-kanban-column">
          <div className="gy-kanban-column-header">
            <span className="gy-kanban-column-title">{col.title}</span>
            <span className="gy-kanban-column-count">{col.items.length}</span>
          </div>
          <div
            className={`gy-kanban-drop-zone ${overCol === col.id ? 'gy-kanban-drop-zone--over' : ''}`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={() => setOverCol(null)}
            onDrop={(e) => handleDrop(e, col.id, col.items.length)}
          >
            {col.items.map((item, idx) => {
              const key = keyExtractor(item);
              const isDragging = dragged?.key === key;
              return (
                <div
                  key={key}
                  className={`gy-kanban-card ${isDragging ? 'gy-kanban-card--dragging' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, key, col.id, idx)}
                  onDragEnd={() => { setDragged(null); setOverCol(null); }}
                  onDrop={(e) => {
                    e.stopPropagation();
                    handleDrop(e, col.id, idx);
                  }}
                >
                  {renderCard(item, isDragging)}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
