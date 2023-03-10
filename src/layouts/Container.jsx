export default function Container({children,Y="",md_Y="",padding="",height="h-auto"}) {
  return (
    <div   className={`bg-white ${height} rounded-t-[2rem] ${padding} ${Y} ${md_Y}`} >
        {children}
    </div>
  )
}
