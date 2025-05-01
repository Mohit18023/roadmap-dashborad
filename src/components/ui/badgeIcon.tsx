interface BadgeProps {
    badge: {
      id: string;
      name: string;
      imageUrl: string;
    };
  }
  
  export function BadgeIcon({ badge }: BadgeProps) {
    return (
      <div
        className="w-[20px] h-[20px] rounded-full overflow-hidden relative group cursor-pointer"
        title={badge.name}
      >
        <img
          src={badge.imageUrl}
          alt={badge.name}
          className="w-full h-full object-cover"
        />
        
        {/* Tooltip */}
        <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded pointer-events-none transition-opacity">
          {badge.name}
        </div>
      </div>
    );
  }
  