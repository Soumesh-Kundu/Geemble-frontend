export default function Button({content,onClick,reverse=false,children,type="button",condition=false,width="w-32 md:w-36"}) {
  return (
    <button disabled={condition} type={type} className={`${width} rounded-full ${reverse?'text-[#0E5FC0]':'text-white'} text-lg md:text-xl h-12 px-5 py-2 box-border ${reverse?'bg-gray-300':'bg-[#0E5FC0]'}`} onClick={onClick}>{content}
    {children}</button>
  )
}

