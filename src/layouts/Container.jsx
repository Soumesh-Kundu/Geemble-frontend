export default function Container({children,Y="",md_Y="",padding="" }) {
  return (
    <div   className={`bg-white h-full rounded-t-[2rem] ${padding} ${Y} ${md_Y}`} >
        {children}
    </div>
  )
}
