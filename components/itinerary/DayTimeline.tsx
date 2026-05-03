"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { DayPlan, Activity } from "@/lib/types";
import { ActivityCard } from "./ActivityCard";
import { EmptyActivitySlot } from "./EmptyActivitySlot";

// ─── Sortable wrapper ─────────────────────────────────────────────────────────

interface SortableActivityProps {
  id: string;
  activity: Activity;
  dayIndex: number;
  activityIndex: number;
  readOnly?: boolean;
  onEdit: (dayIndex: number, activityIndex: number) => void;
  onRemove: (dayIndex: number, activityIndex: number) => void;
}

function SortableActivity({
  id,
  activity,
  dayIndex,
  activityIndex,
  readOnly = false,
  onEdit,
  onRemove,
}: SortableActivityProps): React.ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ActivityCard
        activity={activity}
        dayIndex={dayIndex}
        activityIndex={activityIndex}
        isDragging={isDragging}
        readOnly={readOnly}
        onEdit={onEdit}
        onRemove={onRemove}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

// ─── DayTimeline ──────────────────────────────────────────────────────────────

interface DayTimelineProps {
  day: DayPlan;
  dayIndex: number;
  readOnly?: boolean;
  onEdit: (dayIndex: number, activityIndex: number) => void;
  onRemove: (dayIndex: number, activityIndex: number) => void;
  onReorder: (dayIndex: number, fromIndex: number, toIndex: number) => void;
  onFillSlot: (dayIndex: number, slotId: string, activity: Activity) => void;
}

export function DayTimeline({
  day,
  dayIndex,
  readOnly = false,
  onEdit,
  onRemove,
  onReorder,
  onFillSlot,
}: DayTimelineProps): React.ReactElement {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = day.activities.findIndex((a) => a.id === active.id);
    const toIndex = day.activities.findIndex((a) => a.id === over.id);
    if (fromIndex !== -1 && toIndex !== -1) {
      onReorder(dayIndex, fromIndex, toIndex);
    }
  }

  if (day.activities.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
        No activities for this day
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={day.activities.map((a) => a.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {day.activities.map((activity, activityIndex) => {
            if (activity.type === "empty") {
              return (
                <EmptyActivitySlot
                  key={activity.id}
                  slotId={activity.id}
                  time={activity.time}
                  duration={activity.duration}
                  dayIndex={dayIndex}
                  onFill={onFillSlot}
                />
              );
            }
            return (
              <SortableActivity
                key={activity.id}
                id={activity.id}
                activity={activity}
                dayIndex={dayIndex}
                activityIndex={activityIndex}
                readOnly={readOnly}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}

