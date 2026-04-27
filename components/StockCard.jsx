"use client";

export default function StockCard({ stock, onClick, onAdd, onRemove, onHover }) {
  const changeValue = stock?.change ?? 0;
const isUp = parseFloat(changeValue) >= 0;

  return (
   <div
  onClick={onClick}
  onMouseEnter={onHover}
  className="flex justify-between items-center p-4 rounded-xl 
  bg-white/5 border border-white/10 cursor-pointer
  hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
>
      {/* LEFT */}
      <div>
        <p className="font-medium">{stock?.symbol ?? "N/A"}</p>
        <p className="text-xs text-gray-400">Stock</p>
      </div>

      {/* RIGHT */}
      <div className="text-right flex items-center gap-4">
        <div>
         <p>₹ {stock?.price ?? "--"}</p>
<p className={`text-sm ${isUp ? "text-green-400" : "text-red-400"}`}>
  {changeValue}%
</p>
        </div>

        {/* ACTION BUTTONS */}
        {onAdd && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="text-xs border border-white/20 px-2 py-1 rounded hover:bg-white/10"
          >
            + Watchlist
          </button>
        )}

        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}