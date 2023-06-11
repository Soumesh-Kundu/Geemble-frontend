export default function Loader() {
  return (
    <div className="w-full h-auto flex items-center justify-around z-50 relative">
      <div className="ball  w-2.5 h-2.5 rounded-full bg-white" style={{'--delay':0}}></div>
      <div className="ball  w-2.5 h-2.5 rounded-full bg-white" style={{'--delay':1}}></div>
      <div className="ball  w-2.5 h-2.5 rounded-full bg-white" style={{'--delay':2}}></div>
      <div className="ball w-2.5 h-2.5 rounded-full bg-white"  style={{'--delay':3}}></div>
    </div>
  );
}
