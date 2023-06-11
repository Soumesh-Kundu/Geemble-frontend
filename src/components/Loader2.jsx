export default function Loader2() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-64 h-auto py-3 my-5 flex items-center justify-around z-50 relative">
        <div
          className="ball  w-2.5 h-2.5 rounded-full bg-[#0E5FC0]"
          style={{ "--delay": 0 }}
        ></div>
        <div
          className="ball  w-2.5 h-2.5 rounded-full bg-[#0E5FC0]"
          style={{ "--delay": 1 }}
        ></div>
        <div
          className="ball  w-2.5 h-2.5 rounded-full bg-[#0E5FC0]"
          style={{ "--delay": 2 }}
        ></div>
        <div
          className="ball w-2.5 h-2.5 rounded-full bg-[#0E5FC0]"
          style={{ "--delay": 3 }}
        ></div>
      </div>
    </div>
  );
}
