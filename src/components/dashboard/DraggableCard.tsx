
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '@/store/hooks';
import { moveCard } from '@/store/slices/dashboardLayoutSlice';

interface DraggableCardProps {
  id: string;
  index: number;
  column: number;
  children: React.ReactNode;
}

const ItemTypes = {
  CARD: 'card'
};

interface DragItem {
  id: string;
  index: number;
  column: number;
  type: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ id, index, column, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index, column, type: ItemTypes.CARD },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragId = item.id;
      const hoverId = id;
      
      // Don't replace items with themselves
      if (dragId === hoverId) {
        return;
      }
      
      // Get rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (item.index < index && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (item.index > index && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      dispatch(moveCard({
        dragId,
        hoverId,
        dragColumn: item.column,
        hoverColumn: column
      }));
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = index;
      item.column = column;
    },
  });
  
  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));
  
  return (
    <div ref={ref} style={{ opacity }} className="mb-6 cursor-move" data-handler-id={handlerId}>
      {children}
    </div>
  );
};

export default DraggableCard;
